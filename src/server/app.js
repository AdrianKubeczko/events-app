import express from "express";
import cors from "cors";
import apis from "./api/index.js"

const app = express();

// middleware
app.use(cors());
app.use(express.json());

apis(app)

export default app