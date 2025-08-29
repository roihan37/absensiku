import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export class Controller {
  // CREATE
  static async create(req: Request, res: Response) {
    try {
      const { year, startDate, endDate, isActive } = req.body;

      const newYear = await prisma.academicYear.create({
        data: {
          year,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          isActive
        }
      });

      res.status(201).json({ message: "Academic Year created", data: newYear });
    } catch (error) {
      res.status(500).json({ message: "Failed to create academic year", error });
    }
  }

  // READ ALL
  static async getAll(req: Request, res: Response) {
    try {
      const years = await prisma.academicYear.findMany({
        orderBy: { startDate: "desc" }
      });
      res.status(200).json({ message: "All Academic Years", data: years });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch academic years", error });
    }
  }

  // READ ONE
  static async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const year = await prisma.academicYear.findUnique({
        where: { id: Number(id) },
        include: { class: true }
      });

      if (!year) return res.status(404).json({ message: "Academic Year not found" });

      res.status(200).json({ message: "Academic Year detail", data: year });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch academic year", error });
    }
  }

  // UPDATE
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { year, startDate, endDate, isActive } = req.body;

      const updatedYear = await prisma.academicYear.update({
        where: { id: Number(id) },
        data: {
          year,
          startDate: startDate ? new Date(startDate) : undefined,
          endDate: endDate ? new Date(endDate) : undefined,
          isActive
        }
      });

      res.status(200).json({ message: "Academic Year updated", data: updatedYear });
    } catch (error) {
      res.status(500).json({ message: "Failed to update academic year", error });
    }
  }

  // DELETE
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await prisma.academicYear.delete({
        where: { id: Number(id) }
      });

      res.status(200).json({ message: "Academic Year deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete academic year", error });
    }
  }
}
