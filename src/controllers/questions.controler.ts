import { Request, Response } from "express";
import { DB } from "../config/db";
import { EntityNotFoundError, QueryFailedError } from "typeorm";
import { Question } from "../entities/questions.entity";
import { Test } from "../entities/tests.entity";
import { questionsSchema, questionsUpdateSchema } from "./questions.validator";
const Repository = DB.getRepository(Question);
const TestRepo = DB.getRepository(Test);

const getOne = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }
    const data = await Repository.findOneOrFail({ where: { id } });
    return res.status(200).json({ success: true, data: data });
  } catch (error: any) {
    if (error instanceof EntityNotFoundError) {
      return res
        .status(404)
        .json({ success: false, message: "Questions not found" });
    }

    console.error("Error fetching questions:", error.message || error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
const create = async (req: Request, res: Response) => {
  try {
    const validation = questionsSchema.safeParse(req.body);
    if (!validation.success) {
      return res
        .status(400)
        .json({ success: false, error: validation.error.errors });
    }
    const { text, options, test } = validation.data;
    const existingTest = await TestRepo.findOneBy({ id: test });
    if (!existingTest) {
      return res
        .status(404)
        .json({ success: false, message: "Test not found" });
    }
    const question = Repository.create({ text, options, test: existingTest });

    await Repository.save(question);
    return res.status(201).json({
      success: true,
      message: "Questions created successfully",
      data: question,
    });
  } catch (error: any) {
    console.error("Error creating questions:", error);
    if (
      error instanceof QueryFailedError &&
      error.driverError.code === "23505"
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Questions name already exists" });
    }
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
const update = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }
    const validation = questionsUpdateSchema.safeParse(req.body);
    if (!validation.success) {
      return res
        .status(400)
        .json({ success: false, message: validation.error.errors });
    }
    const { text, options } = validation.data;

    const existingQuestions = await Repository.findOneBy({ id });
    if (!existingQuestions) {
      return res
        .status(404)
        .json({ success: false, message: "Questions not found" });
    }
    await Repository.update(id, {
      text,
      options,
      updated_at: new Date().toISOString(),
    });
    return res.status(200).json({
      success: true,
      message: "Questions updated successfully",
    });
  } catch (error: any) {
    console.error("Error updating Questions:", error.message || error);

    if (
      error instanceof QueryFailedError &&
      error.driverError.code === "23505"
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Questions name already exists" });
    }

    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const delet = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }
    const existingQuestions = await Repository.findOneBy({ id });
    if (!existingQuestions) {
      return res
        .status(404)
        .json({ success: false, message: "Questions not found" });
    }
    await Repository.delete(id);
    return res.status(200).json({
      success: true,
      message: "Questions deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting questions:", error.message || error);

    if (
      error instanceof QueryFailedError &&
      error.driverError.code === "23503"
    ) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete questions. It is referenced by other records.",
      });
    }
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export { create, getOne, update, delet };
