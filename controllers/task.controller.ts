import { Request, Response } from "express";
import { AppDatasource } from "../models/datasource";
import { TaskEntity } from "../models/task.entity";
import { taskValidation } from "../utils/validation";

const taskRepository = AppDatasource.getRepository(TaskEntity);

// Get all Task
const getAllTask = async (req: Request, res: Response) => {
  const task = await taskRepository.find();
  if (!task.length) {
    return res.status(400).json({ msg: `You haven't added any task yet` });
  }
  return res.status(200).json(task);
};

// Get Single Task
const getTask = async (req: Request, res: Response) => {
  const task = await taskRepository.findOneBy({
    id: Number(req.params.id),
  });
  if (!task) {
    return res.status(400).json({ msg: `Task not found` });
  }
  return res.status(200).json(task);
};

// Create Task
const postTask = async (req: Request, res: Response) => {
  try {
    const task = new TaskEntity();

    // Validation
    const { error, value } = await taskValidation.validateAsync(req.body);
    if (error) {
      return res.status(400).json({ msg: `Validation failed..` });
    } else {
      task.name = req.body.name;
      task.description = req.body.description;

      await taskRepository.save(task);
      return res.status(201).json({ msg: `Added task successfully` });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: `Unable to add task..` });
  }
};
// Update Task
const updateTask = async (req: Request, res: Response) => {
  try {
    // validation
    const { error, value } = await taskValidation.validateAsync(req.body);
    if (error) {
      return res.status(400).json({ msg: `Validation failed..` });
    } else {
      const task: any = await taskRepository.findOneBy({
        id: Number(req.params.id),
      });

      if (!task) {
        return res
          .status(400)
          .json({ msg: `Unable to find task with id:${req.body.id}` });
      }

      task.name = req.body.name;
      task.description = req.body.description;

      await taskRepository.save(task);
      console.log(`Updated task with id ${req.params.id}`);
      return res.status(200).json(task);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: `Unable to update task..` });
  }
};

// Delete Task
const deleteTask = async (req: Request, res: Response) => {
  try {
    const task: any = await taskRepository.findOneBy({
      id: Number(req.params.id),
    });

    if (!task) {
      return res
        .status(400)
        .json({ msg: `Unable to find task with id:${req.body.id}` });
    }
    await taskRepository.remove(task);
    console.log(`Deleted task with id: ${req.params.id}`);
    return res.status(200).json(task);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: `Unable to delete task..` });
  }
};

export { getAllTask, getTask, postTask, updateTask, deleteTask };
