import { Knex } from "knex";

const TABLE_NAME = "labels";

/**
 * Create table labels.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements();

    table.string("name", 30).notNullable();

    table.string("color", 100).notNullable();

    table
      .bigInteger("board_id")
      .notNullable()
      .references("id")
      .inTable("boards");
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
