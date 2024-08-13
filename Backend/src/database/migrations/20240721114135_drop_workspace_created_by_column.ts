import { Knex } from "knex";

const TABLE_NAME = "workspaces";

/**
 * Remove created_by from workspaces
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropColumn("created_by");
  });
}

/**
 * Drop table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.bigInteger("created_by").references("id").inTable("users");
  });
}
