// seeds/user_features_seed.js
exports.seed = function (knex) {
    // Deletes ALL existing entries and resets primary key
    return knex('user_features').del()
      .then(function () {
        // Inserts seed entries
        return knex('user_features').insert([
          { id: 1, user_id: 1, feature_id: 1, permission: 'read' },
          { id: 2, user_id: 2, feature_id: 2, permission: 'write' },
          // Add more entries as needed
        ]);
      });
  };