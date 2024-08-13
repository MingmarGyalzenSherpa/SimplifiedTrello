import { Knex } from "knex";

const TABLE_NAME = "cards";

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    // Drop the existing foreign key constraint
    table.dropForeign(["list_id"]);

    // Add the foreign key constraint with ON DELETE CASCADE
    table
      .foreign("list_id")
      .references("id")
      .inTable("lists")
      .onDelete("CASCADE");
  });
}

/**
 * Drop table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    // Drop the CASCADE foreign key constraint
    table.dropForeign(["list_id"]);

    // Re-add the original foreign key constraint without CASCADE
    table.foreign("list_id").references("id").inTable("lists");
  });
}
