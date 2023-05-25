import { Router } from "express";
import {
  getUser,
  getAllUser,
  signin,
  signup,
  deleteUser,
} from "../controllers/auth.controller";
import adminMiddleware from "../middlewares/roles.middlewares";
import authMiddleware from "../middlewares/auth.middleware";

const authRouter: Router = Router();

authRouter.route("/").post(signin);
authRouter.route("/signup").post(signup);
authRouter.route("/user").get(authMiddleware, getAllUser);
authRouter
  .route("/user/:id")
  .get(getUser)
  .delete(authMiddleware, adminMiddleware, deleteUser);

export default authRouter;
