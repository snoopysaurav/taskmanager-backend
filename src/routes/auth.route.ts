import { Router } from "express";
import { getUsers, signin, signup } from "../controllers/auth.controller";

const authRouter: Router = Router();

authRouter.route("/").post(signin).get(getUsers);
authRouter.route("/signup").post(signup);

export default authRouter;
