import express from "express";
import cors from "cors";
import apis from "./api/index.js"

const app = express();

// middleware
app.use(cors());
app.use(express.json());

apis(app)


app.listen(5000, () => {
  console.log("Server started on port 5000");
});
