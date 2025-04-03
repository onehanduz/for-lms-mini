import express from "express";
import { create, delet, getOne, update } from "../controllers/tests.controler";
import questionsRouter from "./questions";
import testsRouter from "./tests";

const router = express.Router();

router.use("/tests", testsRouter);
router.use("/questions", questionsRouter);

export default router;
