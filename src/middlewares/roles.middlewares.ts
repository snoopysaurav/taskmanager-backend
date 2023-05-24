import { NextFunction, Request, Response } from "express";

interface AdminRequest extends Request {
  user: any;
}
const adminMiddleware = async (
  req: AdminRequest,
  res: Response,
  next: NextFunction
) => {
  console.log(req.user);
  // if (!["admin"].includes(req.user.role)) {
  //   return res
  //     .status(401)
  //     .json({ status: false, message: "Only Admin can access" });
  // }
  next();
};

export default adminMiddleware;
