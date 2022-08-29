import express from "express";
import cors from "cors";
import apis from "./api/index.js";

export default (apiMapping) => {
  const app = express();

  // middleware
  app.use(cors());
  app.use(express.json());

  apis(app, apiMapping);

  return app;
};
