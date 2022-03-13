/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('user_id').primary();
    table.string('username', 250).notNullable();
    table.string('password', 250).notNullable();
    table.datetime('create_at', { precision: 6 }).defaultTo(knex.fn.now());
    table.unique('username');
  })
  .createTable('cron_groups', (table) => {
    table.increments('cron_group_id').primary();
    table.string('name', 250).notNullable();
    table.string('cron_groups_description', 250).notNullable();
    table.string('cron_groups_status', 250).notNullable();
    table.datetime('cron_group_create_at', { precision: 6 }).defaultTo(knex.fn.now());
    table.datetime('cron_group_update_at', { precision: 6 }).defaultTo(knex.fn.now());
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('user_id').inTable('users');
  })
  .createTable('cron_jobs', (table) => {
    table.increments('cron_job_id').primary();
    table.string('cron_job_name', 250).notNullable();
    table.string('cron_job_description', 250).notNullable();
    table.string('cron_job_expression', 250).notNullable();
    table.string('cron_job_status', 250).notNullable();
    table.datetime('cron_job_create_at', { precision: 6 }).defaultTo(knex.fn.now());
    table.datetime('cron_job_update_at', { precision: 6 }).defaultTo(knex.fn.now());
    table.integer('cron_group_id').unsigned().notNullable();
    table.foreign('cron_group_id').references('cron_group_id').inTable('cron_groups');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTable('users')
    .dropTable('cron_groups')
    .dropTable('cron_jobs');
};
