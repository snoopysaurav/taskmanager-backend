import express, { Express } from "express";
import dotenv from "dotenv";
import taskRouter from "./routes/task.route";
import { AppDatasource } from "./models/datasource";

dotenv.config();
const port = process.env.PORT;

const app: Express = express();

app.use(express.json());

app.use(taskRouter);

// Database conn
AppDatasource.initialize()
  .then(() => {
    console.log(`Database source has been initalized`);

    // Server
    app.listen(port, () => {
      console.log(`App running at ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error during database initalization", err);
  });
