import { Knex } from "knex";

const TABLE_NAME = "card_labels";

/**
 * Create table card_labels.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigInteger("card_id").notNullable().references("id").inTable("cards");

    table
      .bigInteger("label_id")
      .notNullable()
      .references("id")
      .inTable("labels");
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
