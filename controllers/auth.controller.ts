import { Request, Response } from "express";
import { AppDatasource } from "../models/datasource";
import { UserEntity } from "../models/user.entity";
import bcrypt from "bcrypt";

const AuthRepository = AppDatasource.getRepository(UserEntity);

const signup = async (req: Request, res: Response) => {
  const user = new UserEntity();

  // check if email or username exist or not
  const isEmailExist = await AuthRepository.findOneBy({
    email: req.body.email,
  });
  const isUsernameExist = await AuthRepository.findOneBy({
    username: req.body.username,
  });
  if (isEmailExist) {
    return res.status(500).json({ msg: `Email Address already taken..` });
  } else if (isUsernameExist) {
    return res.status(500).json({ msg: `Username already taken..` });
  } else {
    // bcrypt
    const password = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = hashedPassword;

    await AuthRepository.save(user);
    return res.status(201).json({ msg: `User created...` });
  }
};

const signin = async (req: Request, res: Response) => {};

const getUsers = async (req: Request, res: Response) => {
  try {
    const user = await AuthRepository.find();
    if (!user.length) {
      return res.status(400).json({ msg: `No users` });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ msg: `Cannot get any users` });
  }
};

export { signin, signup, getUsers };
