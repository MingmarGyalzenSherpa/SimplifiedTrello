import { Knex } from "knex";

const TABLE_NAME = "board_members";

/**
 * Create table board_members.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table
      .bigInteger("board_id")
      .notNullable()
      .references("id")
      .inTable("boards");

    table.bigInteger("user_id").notNullable().references("id").inTable("users");

    table.enum("role", ["admin", "member"]).notNullable();

    table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));
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
