import { Knex } from "knex";

const TABLE_NAME = "workspace_members";

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export function seed(knex: Knex): Promise<void> {
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {
          user_id: 1,
          workspace_id: 1,
          role: "admin",
        },
        {
          user_id: 2,
          workspace_id: 2,
          role: "admin",
        },
      ]);
    });
}
