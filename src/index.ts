import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/user.routes";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/test");
app.use("/api", router);

const port = process.env.PORT ?? 8080;

app.listen(port, () => {
  console.log(`Server started and listening on ${port}`);
});
