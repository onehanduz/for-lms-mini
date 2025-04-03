import express from "express";
import { create, delet, getOne, update } from "../controllers/tests.controler";

const testsRouter = express.Router();

testsRouter.get("/:id", getOne);
testsRouter.delete("/:id", delet);
testsRouter.post("/", create);
testsRouter.put("/:id", update);

export default testsRouter;
