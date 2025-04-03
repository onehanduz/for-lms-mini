import { Request, Response } from "express";
import { DB } from "../config/db";
import { EntityNotFoundError, QueryFailedError } from "typeorm";
import { Test } from "../entities/tests.entity";
import { testSchema, testUpdateSchema } from "./tests.validator";
import { Center } from "../entities/centers.entity";
const Repository = DB.getRepository(Test);
const CenterRepo = DB.getRepository(Center);

const getOne = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }
    const data = await Repository.findOneOrFail({
      where: { id },
      relations: ["questions"],
    });
    return res.status(200).json({ success: true, data: data });
  } catch (error: any) {
    if (error instanceof EntityNotFoundError) {
      return res
        .status(404)
        .json({ success: false, message: "Test not found" });
    }

    console.error("Error fetching Test:", error.message || error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
const create = async (req: Request, res: Response) => {
  try {
    const validation = testSchema.safeParse(req.body);
    if (!validation.success) {
      return res
        .status(400)
        .json({ success: false, error: validation.error.errors });
    }
    const { title, description, center } = validation.data;
    const existingCenter = await CenterRepo.findOneBy({ id: center });
    if (!existingCenter) {
      return res
        .status(404)
        .json({ success: false, message: "Center not found" });
    }
    const data = Repository.create({
      title,
      description,
      center: existingCenter,
    });

    await Repository.save(data);
    return res.status(201).json({
      success: true,
      message: "Test created successfully",
      data: data,
    });
  } catch (error: any) {
    console.error("Error creating Test:", error);
    if (
      error instanceof QueryFailedError &&
      error.driverError.code === "23505"
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Test name already exists" });
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
    const validation = testUpdateSchema.safeParse(req.body);
    if (!validation.success) {
      return res
        .status(400)
        .json({ success: false, message: validation.error.errors });
    }
    const { title, description } = validation.data;

    const existingTest = await Repository.findOneBy({ id });
    if (!existingTest) {
      return res
        .status(404)
        .json({ success: false, message: "Test not found" });
    }
    await Repository.update(id, {
      title,
      description,
      updated_at: new Date().toISOString(),
    });
    return res.status(200).json({
      success: true,
      message: "Test updated successfully",
    });
  } catch (error: any) {
    console.error("Error updating Test:", error.message || error);

    if (
      error instanceof QueryFailedError &&
      error.driverError.code === "23505"
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Test name already exists" });
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
    const existingTest = await Repository.findOneBy({ id });
    if (!existingTest) {
      return res
        .status(404)
        .json({ success: false, message: "Test not found" });
    }
    await Repository.delete(id);
    return res.status(200).json({
      success: true,
      message: "Test deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting Test:", error.message || error);

    if (
      error instanceof QueryFailedError &&
      error.driverError.code === "23503"
    ) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete Test. It is referenced by other records.",
      });
    }
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export { create, getOne, update, delet };
