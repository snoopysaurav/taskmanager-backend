import { Router } from "express";
import {
  deleteTask,
  getAllTask,
  getTask,
  postTask,
  updateTask,
} from "../controllers/task.controller";

const taskRouter = Router();

taskRouter.route("/api/v1").get(getAllTask).post(postTask);
taskRouter.route("api/v1/:id").get(getTask).put(updateTask).delete(deleteTask);

export default taskRouter;
