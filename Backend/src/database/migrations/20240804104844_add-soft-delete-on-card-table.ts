import { Knex } from "knex";

const TABLE_NAME = "cards";

/**
 * Add soft delete column to cards table.
 *
 * @param {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.boolean("deleted").notNullable().defaultTo(false);
  });
}

/**
 * Remove soft delete column from cards table.
 *
 * @param {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.dropColumn("deleted");
  });
}
