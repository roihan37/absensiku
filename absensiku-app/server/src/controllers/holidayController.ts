// src/controllers/holidayController.ts
import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export class Controller {

    static async getAll(req: Request, res: Response): Promise<void> {
        try {
            const holidays = await prisma.holiday.findMany({
                orderBy: { date: "asc" },
            });
            res.status(200).json(holidays);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }


    static async getById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const holiday = await prisma.holiday.findUnique({
                where: { id: Number(id) },
            });

            if (!holiday) {
                res.status(404).json({ message: "Holiday not found" });
                return;
            }

            res.status(200).json(holiday);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }


    static async create(req: Request, res: Response): Promise<void> {
        try {
            const { name, description, date, isNational } = req.body;

            const newHoliday = await prisma.holiday.create({
                data: {
                    name,
                    description,
                    date: new Date(date),
                    isNational: isNational ?? false,
                },
            });

            res
                .status(201)
                .json({ message: "Holiday created successfully", holiday: newHoliday });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }


    static async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { name, description, date, isNational } = req.body;

            const updatedHoliday = await prisma.holiday.update({
                where: { id: Number(id) },
                data: {
                    name,
                    description,
                    date: new Date(date),
                    isNational,
                },
            });

            res
                .status(200)
                .json({ message: "Holiday updated successfully", holiday: updatedHoliday });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }


    static async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await prisma.holiday.delete({
                where: { id: Number(id) },
            });

            res.status(200).json({ message: "Holiday deleted successfully" });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
