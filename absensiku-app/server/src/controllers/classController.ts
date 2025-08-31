// controllers/classController.ts
import { Request, Response } from "express";
import { prisma } from "../config/prisma";

class ClassController {
    // CREATE
    static async createClass(req: Request, res: Response) {
        try {
            const { name, classTeacherId, academicYearId } = req.body;

            const newClass = await prisma.class.create({
                data: {
                    name,
                    classTeacherId,
                    academicYearId,
                },
            });

            res.status(201).json({
                message: "Class created successfully",
                data: newClass,
            });
        } catch (error: any) {
            res.status(500).json({ message: "Failed to create class", error: error.message });
        }
    }

    // READ ALL
    static async getClasses(req: Request, res: Response) {
        try {
            const classes = await prisma.class.findMany({
                include: {
                    classTeacher: true,
                    student: true,
                    academicYear: true,
                },
            });

            res.status(200).json(classes);
        } catch (error: any) {
            res.status(500).json({ message: "Failed to fetch classes", error: error.message });
        }
    }

    // READ BY ID
    static async getClassById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const cls = await prisma.class.findUnique({
                where: { id: Number(id) },
                include: {
                    classTeacher: true,
                    student: true,
                    academicYear: true,
                },
            });

            if (!cls) return res.status(404).json({ message: "Class not found" });

            res.status(200).json(cls);
        } catch (error: any) {
            res.status(500).json({ message: "Failed to fetch class", error: error.message });
        }
    }

    // UPDATE
    static async updateClass(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, classTeacherId, academicYearId } = req.body;

            const updatedClass = await prisma.class.update({
                where: { id: Number(id) },
                data: {
                    name,
                    classTeacherId,
                    academicYearId,
                },
            });

            res.status(200).json({
                message: "Class updated successfully",
                data: updatedClass,
            });
        } catch (error: any) {
            res.status(500).json({ message: "Failed to update class", error: error.message });
        }
    }

    // DELETE
    static async deleteClass(req: Request, res: Response) {
        try {
            const { id } = req.params;

            await prisma.class.delete({
                where: { id: Number(id) },
            });

            res.status(200).json({ message: "Class deleted successfully" });
        } catch (error: any) {
            res.status(500).json({ message: "Failed to delete class", error: error.message });
        }
    }

    // controllers/classController.ts
    static async addStudentToClass(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { studentId } = req.body;

            const cls = await prisma.class.findUnique({
                where: { id: Number(id) },
            });
            if (!cls) return res.status(404).json({ message: "Class not found" });

            const updatedStudent = await prisma.student.update({
                where: { id: Number(studentId) },
                data: { classId: Number(id) },
            });

            res.status(200).json({
                message: "Student added to class successfully",
                data: updatedStudent,
            });
        } catch (error: any) {
            res.status(500).json({ message: "Failed to add student", error: error.message });
        }
    }

}

export default ClassController;
