import User from "../models/user.model";
import { Request, Response, NextFunction } from "express";

const create = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const user = new User({ name, email });
  try {
    await user.save();
    return res.status(200).json({
      message: "Successfully signed up!",
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const list = async (req: Request, res: Response) => {
  const users = await User.find().exec();
  return res.status(200).json(users);
};

const userByID = (
  req: Request,
  res: Response,
  next: NextFunction,
  id: string
) => {};

const read = (req: Request, res: Response) => {};
const update = (req: Request, res: Response, next: NextFunction) => {};
const remove = (req: Request, res: Response, next: NextFunction) => {};

export { create, list, read, update, remove, userByID };
