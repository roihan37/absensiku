import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export class Controller {

    static async addAttend(req: Request, res: Response) {
        try {
            const {
                userId,
                date,
                checkIn,
                checkOut,
                status,
                note
            } = req.body

            const user = await prisma.user.findUnique({
                where: {
                    id: userId
                }
            })

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const newAttend = await prisma.attendance.create({
                data: {
                    userId,
                    date,
                    checkIn,
                    checkOut,
                    status,
                    note
                }
            })

            res.status(201).json({
                message: `${newAttend.userId} created successfully`,
            });
        } catch (error) {
            res.status(500).json({ message: "Unknown Error" });
        }
    }

    static async getAttendById(req: Request, res: Response) {
        const { id } = req.params
        try {
            const attendence = await prisma.attendance.findUnique({
                where: { id: Number(id) }
            })

            if (!attendence) {
                return res.status(404).json({ message: "Attendance not found" });
            }

            res.status(200).json(attendence);

        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async getAttendByUserId(req: Request, res: Response) {
        try {
            const { userId } = req.params
            const attendence = await prisma.attendance.findUnique({
                where: { id: Number(userId) }
            })

            if (!attendence) {
                return res.status(404).json({ message: "Attendance not found" });
            }

            res.status(200).json(attendence);

        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async editAttendById(req: Request, res: Response) {
        try {
            const { id } = req.params
            const attendence = await prisma.attendance.findUnique({
                where: { id: Number(id) }
            })

            const user = await prisma.user.findUnique({
                where: {
                    id: attendence?.userId
                }
            })

            if (!attendence || !user) {
                return res.status(404).json({ message: "Attendance not found" });
            }


            const {
                date,
                checkIn,
                checkOut,
                status,
                note
            } = req.body


            const updateAttend = await prisma.attendance.update({
                where: {
                    id: Number(id)
                },
                data: {
                    date,
                    checkIn,
                    checkOut,
                    status,
                    note
                }
            })

            res.status(200).json({
                message: 'User updated successfully',
                user: updateAttend
            })
        } catch (error) {
            res.status(500).json({ message: "Unknown Error" });
        }
    }

    static async deleteAttendance(req: Request, res: Response) {
        try {
            const { id } = req.params;

            await prisma.attendance.delete({
                where: { id: Number(id) },
            });

            res.status(200).json({
                message: "Attendance deleted successfully",
            });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to delete attendance",
                error: error.message,
            });
        }
    }
}