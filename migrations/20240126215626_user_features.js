exports.up = function (knex) {
    return knex.schema.createTable('user_features', function (table) {
        table.increments('id').primary();
        table.integer('user_id').notNullable();
        table.integer('feature_id').notNullable();
        table.string('permission').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('user_features');
};