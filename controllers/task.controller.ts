import { Request, Response } from "express";
import { AppDatasource } from "../models/datasource";
import { Task } from "../models/task.entity";

const taskRepository = AppDatasource.getRepository(Task);

const getAllTask = async (req: Request, res: Response) => {
  const task = await taskRepository.find();
  if (!task.length) {
    res.status(404).send({ msg: `You haven't added any task yet` });
  }
  res.status(200).send(task);
};

const getTask = async (req: Request, res: Response) => {
  const task = await taskRepository.findOneBy({
    id: req.params.id,
  });
  res.status(200).send(task);
};

const postTask = async (req: Request, res: Response) => {
  try {
    const task = new Task();
    task.name = req.body.name;
    task.description = req.body.description;

    await taskRepository.save(task);
    res.send(`Added task successfully`);
  } catch (error) {
    res.send(`Unable to add task..`);
    console.log(error);
  }
};

const updateTask = async (req: Request, res: Response) => {};

const deleteTask = async (req: Request, res: Response) => {};

export { getAllTask, getTask, postTask, updateTask, deleteTask };
