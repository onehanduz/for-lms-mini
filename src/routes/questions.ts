import express from "express";
import {
  create,
  delet,
  getOne,
  update,
} from "../controllers/questions.controler";

const questionsRouter = express.Router();

questionsRouter.get("/:id", getOne);
questionsRouter.delete("/:id", delet);
questionsRouter.post("/", create);
questionsRouter.put("/:id", update);

export default questionsRouter;
