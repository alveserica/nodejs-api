// migrations/20240128000000_add_password_to_users.js

exports.up = function (knex) {
    return knex.schema.table('users', function (table) {
      table.string('password').notNullable(); // Add the 'password' column
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table('users', function (table) {
      table.dropColumn('password'); // Drop the 'password' column in case of rollback
    });
  };
  