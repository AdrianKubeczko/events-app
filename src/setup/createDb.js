import { client, pool } from "../server/DB/eventsDB/dbConnection.js";
import { tableName, databaseName } from "../server/constants/events-db.js";

await client.connect();
await client.query(`DROP DATABASE IF EXISTS ${databaseName};`);
await client.query(`CREATE DATABASE ${databaseName};`);
await client.end();
await pool.query(`CREATE TABLE ${tableName}(
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),
  event_date VARCHAR(255)
);`);
