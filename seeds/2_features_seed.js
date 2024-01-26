// seeds/features_seed.js
exports.seed = function (knex) {
    // Deletes ALL existing entries and resets primary key
    return knex('features').del()
      .then(function () {
        // Inserts seed entries
        return knex('features').insert([
          { id: 1, feature: 'feature1' },
          { id: 2, feature: 'feature2' },
          // Add more entries as needed
        ]);
      });
  };