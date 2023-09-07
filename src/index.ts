import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(cors());

mongoose.connect("mongodb://localhost:27017/test");
app.get("/", (req, res) => {
  res.send("Hello TypeScript!");
});

const port = process.env.PORT ?? 8080;

app.listen(port, () => {
  console.log(`Server started and listening on ${port}`);
});
