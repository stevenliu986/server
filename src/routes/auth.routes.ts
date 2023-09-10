import express from "express";
import { signOut, signIn } from "../controllers/auth.controller";

const authRouter = express.Router();
authRouter.get("auth/signout", signOut);
authRouter.post("/auth/signin", signIn);

export default authRouter;
