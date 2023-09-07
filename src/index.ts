import express from "express";
const cors = require("cors");

const app = express();
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello TypeScript!");
});

const port = process.env.PORT ?? 8080;

app.listen(port, () => {
  console.log(`Server started and listening on ${port}`);
});
