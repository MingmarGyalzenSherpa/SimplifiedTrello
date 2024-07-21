import { Knex } from "knex";

const TABLE_NAME = "boards";

/**
 * Create table boards.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements();

    table.string("title", 30).notNullable();

    table.text("description").nullable();

    table.string("background_color", 100).notNullable().defaultTo("white");

    table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));

    table
      .bigInteger("workspace_id")
      .notNullable()
      .references("id")
      .inTable("workspaces");
  });
}

/**
 * Drop table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
