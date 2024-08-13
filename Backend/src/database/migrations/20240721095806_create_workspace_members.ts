import { Knex } from "knex";

const TABLE_NAME = "workspace_members";

/**
 * Create table workspace_members.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigInteger("user_id").notNullable().references("id").inTable("users");

    table
      .bigInteger("workspace_id")
      .notNullable()
      .references("id")
      .inTable("workspaces");

    table.enum("role", ["admin", "member"]).notNullable();

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
