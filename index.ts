import express, { Express } from "express";
import dotenv from "dotenv";
import taskRouter from "./src/routes/task.route";
import { AppDatasource } from "./src/models/datasource";
import authRouter from "./src/routes/auth.route";
import authMiddleware from "./src/middlewares/auth.middleware";
import adminMiddleware from "./src/middlewares/roles.middlewares";

dotenv.config();
const port = process.env.PORT;

const app: Express = express();

app.use(express.json());

app.use(authRouter);
app.use(authMiddleware, adminMiddleware, taskRouter);

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
