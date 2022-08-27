import { pool } from "../db.js";
import { tableName } from "../constants/events-db.js";
import {
  GET,
  POST,
  PUT,
  DELETE,
} from "../constants/requestMethods.js";

export default {
  tablePath: "/events",
  rowPath: "/events/:id",
  tableMethods: {
    [GET]: async (req, res) => {
      try {
        const users = await pool.query(`SELECT * FROM ${tableName}`);
        res.json(users.rows);
      } catch (error) {
        console.error(error.message);
      }
    },
    [POST]: async (req, res) => {
      try {
        const { first_name, last_name, email, event_date } = req.body;
        const newUser = await pool.query(
          `INSERT INTO ${tableName} (first_name, last_name, email, event_date) VALUES($1, $2, $3, $4) RETURNING *`,
          [first_name, last_name, email, event_date]
        );
        res.json(newUser.rows[0]);
      } catch (error) {
        console.error(error.message);
      }
    },
  },
  rowMethods: {
    [GET]: async (req, res) => {
      try {
        const { id } = req.params;
        const user = await pool.query(
          `SELECT * FROM ${tableName} WHERE id = $1`,
          [id]
        );
        res.json(user.rows);
      } catch (error) {
        console.error(error.message);
      }
    },
    [PUT]: async (req, res) => {
      try {
        const { id } = req.params;
        const { first_name, last_name, email, event_date } = req.body;
        const updatedUser = await pool.query(
          `UPDATE ${tableName} SET first_name = $1, last_name = $2, email = $3, event_date = $4 WHERE id = $5 RETURNING *`,
          [first_name, last_name, email, event_date, id]
        );
        res.json(updatedUser.rows[0]);
      } catch (error) {
        console.error(error.message);
      }
    },
    [DELETE]: async (req, res) => {
      try {
        const { id } = req.params;
        await pool.query(
          `DELETE FROM ${tableName} WHERE id = $1`,
          [id]
        );
        res.json("Deleted!");
      } catch (error) {
        console.error(error.message);
      }
    },
  },
};
