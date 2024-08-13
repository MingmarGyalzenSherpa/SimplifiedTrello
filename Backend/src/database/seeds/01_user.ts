import { Knex } from "knex";

const TABLE_NAME = "users";

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
          username: "test1",
          first_name: "test1",
          last_name: "test1",
          email: "test1@test.com",
          password: "test123",
        },
        {
          username: "test2",
          first_name: "test2",
          last_name: "test2",
          email: "test2@test.com",
          password: "test123",
        },
        {
          username: "test3",
          first_name: "test3",
          last_name: "test3",
          email: "test3@test.com",
          password: "test123",
        },
      ]);
    });
}
