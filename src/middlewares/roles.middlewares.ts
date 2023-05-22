import { NextFunction, Request, Response } from "express";

const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const isAuth = req.headers.authorization;
    if (!isAuth) return res.status(400).json(`Unauthorized Role..`);
    const role = req.body.role;
    if (role === "admin") {
      next();
    }
    return res.status(400).json(`Access Denied...`);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default adminMiddleware;
