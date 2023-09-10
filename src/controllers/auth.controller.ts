import { Request, Response } from "express";
import User from "../models/user.model";
// import jwt from "jsonwebtoken";
// import expressJwt from "express-jwt";

const signOut = async (req: Request, res: Response) => {
  return null;
};

const signIn = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    let user = await User.findOne({ email }).exec();
    if (!user) {
      return res.json("user not found");
    }
    if (!user.authenticate("password")) {
      console.log("Hello, I am the method that is defined in the model");
    }
    return res.json(user);
    // if (!user) {
    //   return res.status(401).json("User not found");
    // }
    // // TODO: 将匹配上的用户的密码与登录用户输入的密码比对
    // if (!user.authenticate(password)) {
    //   return res.status(401).json({ error: "email or password incorrect" });
    // }

    // const token = "111";
    // res.cookie("token", token, { expires: new Date() });
    // return res.json("Login successful!");
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

export { signOut, signIn };
