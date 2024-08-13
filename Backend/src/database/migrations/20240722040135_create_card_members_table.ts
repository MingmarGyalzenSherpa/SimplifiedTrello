import { Knex } from "knex";

const TABLE_NAME = "card_members";

/**
 * Create table card_members.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigInteger("card_id").notNullable().references("id").inTable("cards");
    table.bigInteger("user_id").notNullable().references("id").inTable("users");
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
