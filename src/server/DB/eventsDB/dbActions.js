import { pool } from "./dbConnection.js";
import { tableName } from "../../constants/events-db.js";

export default {
  getEvents: async () => {
    return pool.query(`SELECT * FROM ${tableName}`);
  },
  addEvent: async ({ first_name, last_name, email, event_date }) => {
    return pool.query(
      `INSERT INTO ${tableName} (first_name, last_name, email, event_date) VALUES($1, $2, $3, $4) RETURNING *`,
      [first_name, last_name, email, event_date]
    );
  },
  getEvent: async ({ id }) => {
    return pool.query(`SELECT * FROM ${tableName} WHERE id = $1`, [id]);
  },
  updateEvent: async ({ first_name, last_name, email, event_date, id }) => {
    return pool.query(
      `UPDATE ${tableName} SET first_name = $1, last_name = $2, email = $3, event_date = $4 WHERE id = $5 RETURNING *`,
      [first_name, last_name, email, event_date, id]
    );
  },
  deleteEvent: async ({ id }) => {
    return pool.query(`DELETE FROM ${tableName} WHERE id = $1 RETURNING *` , [id]);
  },
};
