import { Router } from "express";
import {
  deleteTask,
  getAllTask,
  getTask,
  postTask,
  updateTask,
} from "../controllers/task.controller";

const taskRouter: Router = Router();

taskRouter.route("/task").get(getAllTask).post(postTask);
taskRouter.route("/task/:id").get(getTask).put(updateTask).delete(deleteTask);

export default taskRouter;
