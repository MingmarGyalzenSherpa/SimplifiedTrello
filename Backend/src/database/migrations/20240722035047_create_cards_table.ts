import { Knex } from "knex";

const TABLE_NAME = "cards";

/**
 * Create table cards.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements();

    table.string("title", 30).notNullable();

    table.text("description").notNullable();

    table.integer("position").unsigned().notNullable();

    table.bigInteger("list_id").notNullable().references("id").inTable("lists");

    table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));

    table.timestamp("updated_at").nullable();
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
