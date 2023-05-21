import { Router } from "express";
import {
  deleteTask,
  getAllTask,
  getTask,
  postTask,
  updateTask,
} from "../controllers/task.controller";
import authMiddleware from "../middlewares/auth";

const taskRouter = Router();

taskRouter.route("/task").get(getAllTask).post(authMiddleware,postTask);
taskRouter.route("/task/:id").get(getTask).put(updateTask).delete(deleteTask);

export default taskRouter;
