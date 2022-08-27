import pg from "pg";
import {
  dbUsername,
  dbPassword,
  databaseName,
  dbHost,
  dbPort,
} from "./constants/events-db.js";

const { Client, Pool } = pg;

const data = {
  user: dbUsername,
  host: dbHost,
  password: dbPassword,
  port: dbPort,
};

export const client = new Client({
  ...data,
});

export const pool = new Pool({
  ...data,
  database: databaseName,
});
