import { Request, Response } from "express";

const getAllTask = async (req: Request, res: Response) => {
  res.send(`Wow it's working fine`);
};

const getTask = async (req: Request, res: Response) => {};

const postTask = async (req: Request, res: Response) => {};

const updateTask = async (req: Request, res: Response) => {};

const deleteTask = async (req: Request, res: Response) => {};

export { getAllTask, getTask, postTask, updateTask, deleteTask };
