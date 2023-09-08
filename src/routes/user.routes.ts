import express from "express";
import {
  create,
  list,
  userByID,
  update,
  remove,
} from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post("/users", create);
userRouter.get("/users", list);
userRouter.get("/users/:id", userByID);
userRouter.put("/users/:id", update);
userRouter.delete("/users/:id", remove);

export default userRouter;
