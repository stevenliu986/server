import express from "express";
import { create, list } from "../controllers/user.controller";

const router = express.Router();

router.post("/users", create);
router.get("/users", list);

export default router;
