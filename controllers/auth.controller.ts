import { Request, Response } from "express";
import { AppDatasource } from "../models/datasource";
import { User } from "../models/user.entity";
const argon2 = require("argon2");

const AuthRepository = AppDatasource.getRepository(User);

const signup = async (req: Request, res: Response) => {
  const user = new User();

  const isEmailExist = AuthRepository.findOneBy({ email: req.body.email });
  const isUsernameExist = AuthRepository.findOneBy({
    username: req.body.username,
  });

  if (isEmailExist || isUsernameExist) {
    return res
      .status(500)
      .json({ msg: `Username OR Email address already taken` });
  }
  const hashedPassword = argon2.hash(req.body.password);
  user.firstname = req.body.firstname;
  user.lastname = req.body.lastname;
  user.username = req.body.username;
  user.email = req.body.email;
  user.password = hashedPassword;

  await AuthRepository.save(user);
  res.status(201).json({ msg: `User created...` });
};

const signin = async (req: Request, res: Response) => {};

const getUsers = async (req: Request, res: Response) => {};

export { signin, signup, getUsers };
