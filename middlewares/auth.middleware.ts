import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      let user = verify(token, process.env.JWT_SECRET) as JwtPayload;
      console.log(user);
      // @ts-ignore
      req.id = user?.id;
      next();
    } else {
      return res.status(401).json({ msg: `Unauthorized..` });
    }
  } catch (error) {
    return res.status(401).json({ msg: `Unauthorized..` });
  }
};

export default authMiddleware;
