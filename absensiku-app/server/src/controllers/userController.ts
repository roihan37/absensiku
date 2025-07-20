import { compare } from "bcryptjs";
import { Request, Response } from "express";
import { addRefreshTokenToWhitelist, } from "../auth/auth.services";
import { prisma } from "../config/prisma";
import { LoginBody } from "../types/express";
import { generateTokens } from "../utils/sendRefreshToken";

export class Controller {

    static async login(
        req: Request<{}, {}, LoginBody>,
        res: Response
    ) {
        try {
            const { email, password } = req.body

            if (!email || !password) {
                throw { name: "badRequest" }
            }

            const existingUser = await prisma.user.findUnique(
                {
                    where: { email },
                    include: {
                        admin: true
                    }
                }
            )

            if (!existingUser) {
                throw { name: "Unauthorized" }
            }

            const comparePassword = compare(password, existingUser.password)
            if (!comparePassword) {
                throw { name: "Unauthorized" }
            }

            const { accessToken, refreshToken } = generateTokens(existingUser);
            await addRefreshTokenToWhitelist({ refreshToken, userId: existingUser.id });

            res
                .cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 1000 * 60 * 60 * 24 // 1 hari
                })
                .status(200).json({ accessToken })

        } catch (error: unknown) {
            console.log(error);

            if (typeof error === 'object' && error !== null && 'name' in error) {
                const err = error as { name: string };

                if (err.name === "badRequest") {
                    res.status(400).json({ message: "Email / Password is required" });
                } else if (err.name === "Unauthorized") {
                    res.status(401).json({ message: "Invalid Email / Password" });
                } else {
                    res.status(500).json({ message: "Internal Server Error" });
                }
            } else {
                res.status(500).json({ message: "Unknown Error" });
            }
        }



    }

    static async getAllAdmins(req: Request, res: Response) {
        try {
            const allAdmins = await prisma.user.findMany({
                where: { role: 'admin' },
                include: { admin: true }
            })

            const safeAdmins = allAdmins.map(({ password, ...rest }) => rest);

            res.status(200).json(safeAdmins);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to fetch admin users' });
        }
    }

    static async getAllTeachers(req: Request, res: Response) {
        try {
            const allTeachers = await prisma.user.findMany({
                where: { role: 'teacher' },
                include: { teacher: true }
            })

            const safeTeachers = allTeachers.map(({ password, ...rest }) => rest);

            res.status(200).json(safeTeachers);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to fetch teacher users' });
        }
    }

    static async getAllStudents(req: Request, res: Response) {
        try {
            const allStudents = await prisma.user.findMany({
                where: { role: 'student' },
                include: { student: true }
            })

            const safeStudents = allStudents.map(({ password, ...rest }) => rest);

            res.status(200).json(safeStudents);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to fetch student users' });
        }
    }

}