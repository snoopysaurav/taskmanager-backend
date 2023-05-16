import { Request, Response } from "express";
import { AppDatasource } from "../models/datasource";
import { Task } from "../models/task.entity";

const taskRepository = AppDatasource.getRepository(Task);

// Get all Task
const getAllTask = async (req: Request, res: Response) => {
  const task = await taskRepository.find();
  if (!task.length) {
    res.send({ msg: `You haven't added any task yet` });
  }
  res.send(task);
};

// Get Single Task
const getTask = async (req: Request, res: Response) => {
  const task = await taskRepository.findOneBy({
    id: Number(req.params.id),
  });
  res.send(task);
};

// Create Task
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
// Update Task
const updateTask = async (req: Request, res: Response) => {
  try {
    const task: any = await taskRepository.findOneBy({
      id: Number(req.params.id),
    });

    task.name = req.body.name;
    task.description = req.body.description;

    await taskRepository.save(task);
    res.send(task);
    console.log(`Updated task with id ${req.params.id}`);
  } catch (error) {
    res.send(`Unable to update task..`);
    console.log(error);
  }
};

// Delete Task
const deleteTask = async (req: Request, res: Response) => {
  try {
    const task: any = await taskRepository.findOneBy({
      id: Number(req.params.id),
    });

    await taskRepository.remove(task);
    res.send(task);
    console.log(`Deleted task with id: ${req.params.id}`);
  } catch (error) {
    res.send(`Unable to delete task..`);
    console.log(error);
  }
};

export { getAllTask, getTask, postTask, updateTask, deleteTask };
