import express from "express";
import {
  create,
  list,
  userByID,
  update,
  remove,
} from "../controllers/user.controller";

const router = express.Router();

router.post("/users", create);
router.get("/users", list);
router.get("/users/:id", userByID);
router.put("/users/:id", update);
router.delete("/users/:id", remove);

export default router;
