import express, { Express, Request, Response, Router } from "express";
import dotenv from "dotenv";
import taskRouter from "./routes/task.route";

dotenv.config();
const port = process.env.PORT;

const app: Express = express();

app.use(express.json());

app.use(taskRouter);

// server
app.listen(port, () => {
  console.log(`App running at ${port}`);
});
