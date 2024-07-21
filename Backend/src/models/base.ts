import { Knex } from "knex";
import db from "../utils/db";

/**
 * Base Model for other models
 */
export class BaseModel {
  static connection: Knex = db;

  static queryBuilder = () => this.connection;
}
