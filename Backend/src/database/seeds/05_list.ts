import { Knex } from "knex";

const TABLE_NAME = "lists";

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
          title: "to-do",
          position: 1,
          board_id: 1,
        },
        {
          title: "completed",
          position: 2,
          board_id: 1,
        },
      ]);
    });
}
