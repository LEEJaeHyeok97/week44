import express from "express";
import api from "./api";

const app = express();
const port = 3000;

app.use(express.json()); // id 를 넘겨주는 ...
app.use("/api", api); // /api 

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
