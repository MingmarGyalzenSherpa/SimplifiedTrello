import { Knex } from "knex";

const TABLE_NAME = "card_labels";

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
          card_id: 1,
          label_id: 1,
        },
        {
          card_id: 2,
          label_id: 2,
        },
      ]);
    });
}
