import { Router } from "express";
import {
  getUser,
  getAllUser,
  signin,
  signup,
} from "../controllers/auth.controller";

const authRouter: Router = Router();

authRouter.route("/").post(signin);
authRouter.route("/signup").post(signup);
authRouter.route("/user").get(getAllUser);
authRouter.route("/user/:id").get(getUser);

export default authRouter;
