import { Knex } from "knex";

const TABLE_NAME = "boards";

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
          title: "design",
          workspace_id: 1,
        },
        {
          title: "development",
          workspace_id: 1,
        },
      ]);
    });
}
