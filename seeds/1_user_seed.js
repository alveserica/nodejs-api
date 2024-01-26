exports.seed = function (knex) {
  // Deletes ALL existing entries and resets primary key
  return knex('users').del()
    .then(function () {
      // Inserts seed entries with the hardcoded hashed password
      return knex('users').insert([
        { id: 1, username: 'user1', email: 'user1@example.com', password: "$2b$10$LsSTFXaB8n7UE7rOR.1eYeU8sRiaEdpTWE5mRZKUwLxlYV8LNXnK." },
        { id: 2, username: 'user2', email: 'user2@example.com', password: "$2b$10$LsSTFXaB8n7UE7rOR.1eYeU8sRiaEdpTWE5mRZKUwLxlYV8LNXnK." },
        // Add more entries as needed
      ]);
    });
};
