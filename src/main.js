const express = require("express");
const { Pool } = require("pg");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const authenticateToken = require("./middleware/auth");

const app = express();
const PORT = 8084;

// PostgreSQL configuration
const pool = new Pool({
  user: "sigma",
  host: "postgres",
  database: "sigma",
  password: "sigma",
  port: 5432,
});

// Middleware to add the PostgreSQL pool to the request object
app.use((req, res, next) => {
  req.db = pool;
  next();
});

app.use(express.json());

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}`);
});

app.post("/auth", async (req, res) => {

  const { user, password } = req.body;

  try {
    const result = await req.db.query(`SELECT * FROM users WHERE username = '${user}'`);
    const isPasswordValid = bcrypt.compareSync(password, result.rows[0].password);

    if (result.rowCount === 0 || !isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    let permissions = [];
    const getPermissions = await req.db.query(`SELECT * FROM user_features LEFT JOIN features ON user_features.feature_id = features.id WHERE user_features.user_id = ${result.rows[0].id}`)

    for (let p of getPermissions.rows) {
      let permissionString = `user:${p['feature']}:${p['permission']}`
      permissions.push(permissionString)
    }

    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign({ id: result.rows[0].id, user: result.rows[0].user }, secretKey, { expiresIn: "1h" });

    res.json({ 
      token,
      user: {
        firstname: result.rows[0].username,
        email: result.rows[0].email
      },
      permissions
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/user/:id", authenticateToken, async (req, res) => {
  try {
    const result = await req.db.query(`SELECT * FROM users WHERE id = '${req.params.id}'`);
    
    if (result.rowCount === 0) {
        return res.status(403).json({ error: "Forbidden" });
    }

    let permissions = [];
    const getPermissions = await req.db.query(`SELECT * FROM user_features LEFT JOIN features ON user_features.feature_id = features.id WHERE user_features.user_id = ${result.rows[0].id}`)

    for (let p of getPermissions.rows) {
      let permissionString = `user:${p['feature']}:${p['permission']}`
      permissions.push(permissionString)
    }

    res.json({ 
      user: {
        firstname: result.rows[0].username,
        email: result.rows[0].email
      },
      permissions
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})