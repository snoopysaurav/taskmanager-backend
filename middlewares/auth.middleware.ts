import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AppDatasource } from "../models/datasource";
import { UserEntity } from "../models/user.entity";

const AuthRepository = AppDatasource.getRepository(UserEntity);

dotenv.config();

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(400).json({ msg: `Invalid Token. Access Denied` });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);

    const user: any = await AuthRepository.findOneBy({
      id: decoded.id,
    });

    if (!user) {
      return res.status(400).json("invalid");
    }
    req.body.id = user.id;
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default authMiddleware;
