import { Knex } from "knex";

const TABLE_NAME = "labels";

/**
 * Remove board_id column from labels table.
 *
 * @param {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    // First, drop the foreign key constraint
    table.dropForeign("board_id");
    // Then, drop the column
    table.dropColumn("board_id");
  });
}

/**
 * Add board_id column back to labels table.
 *
 * @param {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    // Add the column back
    table.bigInteger("board_id").unsigned();
    // Re-add the foreign key constraint
    table.foreign("board_id").references("id").inTable("boards");
  });
}
