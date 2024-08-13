import { Knex } from "knex";

const TABLE_NAME = "cards";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    // Alter the 'description' column to be nullable
    table.text("description").nullable().alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    // Revert 'description' column back to not nullable
    table.text("description").notNullable().alter();
  });
}