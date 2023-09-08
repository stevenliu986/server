import User from "../models/user.model";
import { Request, Response } from "express";

const create = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const user = new User({ name, email });
  try {
    await user.save();
    return res.status(200).json({
      message: "Successfully signed up!",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const list = async (req: Request, res: Response) => {
  try {
    const users = await User.find().exec();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const userByID = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  try {
    const user = await User.findById(id).exec();
    if (!user) {
      return res.status(400).json("User not found!");
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const read = (req: Request, res: Response) => {};
const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { email },
      { new: true }
    ).exec();
    if (!user) {
      return res.status(400).json("User not found");
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndRemove(id).exec();
    if (!user) {
      return res.status(400).json("User removed unsuccessfully!");
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { create, list, read, update, remove, userByID };
