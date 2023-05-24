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
  if (!req.user.role.includes("admin")) {
    return res
      .status(401)
      .json({ status: false, message: "Only Admin can access" });
  }
  next();
};

export default adminMiddleware;
