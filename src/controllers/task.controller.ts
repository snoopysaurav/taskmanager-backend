import { Request, Response } from "express";
import { AppDatasource } from "../models/datasource";
import { TaskEntity } from "../models/task.entity";
import { taskUpdateValidation, taskValidation } from "../utils/validation";
import { UserEntity } from "../models/user.entity";

const taskRepository = AppDatasource.getRepository(TaskEntity);
const authRepository = AppDatasource.getRepository(UserEntity);

interface userRequest extends Request {
  user: any;
}

// Get all Task
const getAllTask = async (req: Request, res: Response) => {
  const task = await taskRepository.find({
    relations: {
      user: true,
    },
  });
  if (!task.length) {
    return res.status(400).json({ msg: `You haven't added any task yet` });
  }
  return res.status(200).json(task);
};

// Get Single Task
const getTask = async (req: Request, res: Response) => {
  const task = await taskRepository.findOne({
    where: {
      id: Number(req.params.id),
    },
    relations: {
      user: true,
    },
  });
  if (!task) {
    return res.status(400).json({ msg: `Task not found` });
  }
  return res.status(200).json(task);
};

// Create Task
const postTask = async (req: userRequest, res: Response) => {
  try {
    const task = new TaskEntity();
    const id = req.user.id;
    const user = await authRepository.findOne({
      where: { id },
    });

    // Validation
    const { error, value } = await taskValidation.validateAsync(req.body);
    if (error) {
      return res.status(400).json({ msg: `Validation failed..` });
    } else {
      task.name = req.body.name;
      task.description = req.body.description;
      task.user = user;

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
    const { error, value } = await taskUpdateValidation.validateAsync(req.body);
    if (error) {
      return res.status(400).json({ msg: `Validation failed..` });
    } else {
      // @ts-ignore
      const userId = req.user.id;
      const task: any = await taskRepository.findOne({
        where: {
          id: Number(req.params.id),
        },
        relations: {
          user: true,
        },
      });
      const user = await authRepository.findOneBy({
        id: userId,
      });
      console.log(user);

      if (!task) {
        return res
          .status(400)
          .json({ msg: `Unable to find task with id:${req.body.id}` });
      }

      task.name = req.body.name;
      task.description = req.body.description;

      console.log(task.user.id);

      if (!(task.user.id === user.id)) {
        return res.status(400).json(`Unauthorized user..`);
      }
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
    const task: any = await taskRepository.findOne({
      where: {
        id: Number(req.params.id),
      },
      relations: {
        user: true,
      },
    });

    // @ts-ignore
    const userId = req.user.id;
    const user = await authRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!task) {
      return res
        .status(400)
        .json({ msg: `Unable to find task with id:${req.body.id}` });
    }

    if (!(task.user.id === user.id)) {
      return res.status(400).json(`Unauthorized user..`);
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
