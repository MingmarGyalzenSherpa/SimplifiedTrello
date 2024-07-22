import { Knex } from "knex";

const TABLE_NAME = "cards";

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
          title: "design hero section",
          description: "Design a hero section with clean ui",
          position: 0,
          list_id: 1,
        },
        {
          title: "design about section",
          description: "Design a hero section with clean ui",
          position: 1,
          list_id: 2,
        },
      ]);
    });
}
