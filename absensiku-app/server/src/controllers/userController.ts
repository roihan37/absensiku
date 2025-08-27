import { compare } from "bcryptjs";
import { Request, Response } from "express";
import { Prisma } from "../../generated/prisma";
import { addRefreshTokenToWhitelist, } from "../auth/auth.services";
import { prisma } from "../config/prisma";
import { LoginBody } from "../types/express";
import { hash } from "../utils/bcyriptjs";
import { exclude } from "../utils/prisma";
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

    static async addUser(req: Request, res: Response) {
        try {
            const {
                name,
                username,
                password,
                email,
                role,
                gender,
                phoneNumber,
                address,
                nip,
                nuptk,
                nis,
                nisn,
                class: classId
            } = req.body
            const hashedPassword = await hash(password);

            const newUser = await prisma.user.create({
                data: {
                    name,
                    username,
                    password: hashedPassword,
                    email,
                    role,
                    gender,
                    phoneNumber,
                    address
                }
            });

            if (role === 'admin') {
                await prisma.admin.create({
                    data: {
                        userId: newUser.id,
                        nip,
                        nuptk
                    }
                });
            } else if (role === 'teacher') {
                await prisma.teacher.create({
                    data: {
                        userId: newUser.id,
                        nip,
                        nuptk
                    }
                });
            } else if (role === 'student') {
                await prisma.student.create({
                    data: {
                        userId: newUser.id,
                        nis,
                        nisn,
                        classId: Number(classId), 
                    }
                });
            }

            res.status(201).json({
                message: `${newUser.name} created successfully`,
            });


        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
              if (err.code === 'P2002') {
                const target = err.meta?.target;
                const fields = Array.isArray(target) ? target.join(', ') : 'field';
                return res.status(409).json({
                  message: `${fields} sudah digunakan.`,
                });
              }
            }
          
            console.error('RefreshToken Error:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
          }
    }

    static async getUserById(req: Request, res: Response){
        const {id} = req.params
        const user = await prisma.user.findUnique({
            where : { id },
        })

        if (!user) {
            return res.status(404).json({ message: "User not found" });
          }

        const safeUser = exclude(user, ["password"]);


        res.status(200).json({
            user: safeUser,
          });
    
    }

    static async editUser(req: Request, res: Response) {
        const {id} = req.params
        try {
            const {
                name,
                username,
                password,
                email,
                role,
                gender,
                phoneNumber,
                address,
                nip,
                nuptk,
                nis,
                nisn,
                class: classId,
                status
            } = req.body
            const hashedPassword = await hash(password);

            const updateUser = await prisma.user.update({
                where : {
                    id
                },
                data: {
                    name,
                    username,
                    password: hashedPassword,
                    email,
                    role,
                    gender,
                    phoneNumber,
                    address,
                    
                }
            });

            if (role === 'admin') {
                await prisma.admin.update({
                    where : {
                        userId: updateUser.id,
                    },
                    data: {
                        nip,
                        nuptk,

                    }
                });
            } else if (role === 'teacher') {
                await prisma.teacher.update({
                    where : {
                        userId: updateUser.id,
                    },
                    data: {
                        nip,
                        nuptk,
                    }
                });
            } else if (role === 'student') {
                await prisma.student.update({
                    where : {
                        userId: updateUser.id,
                    },
                    data: {
                        nis,
                        nisn,
                    }
                });
            }

            res.status(201).json({
                message: 'User created successfully',
                user: updateUser
            });


        } catch (error) {
            console.log(error);
            
        }
    }


    static async getAllAdmins(req: Request, res: Response) {
        try {
            const allAdmins = await prisma.user.findMany({
                where: { role: 'admin' },
                include: { admin: true }
            })

            const safeAdmins = allAdmins.map((user)=> exclude(user, ["password"]));

            res.status(200).json(safeAdmins);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to fetch admin users' });
        }
    }

    static async changeAdmin(req: Request, res: Response) {
        try {
            const { id } = req.params
            const existingUser = await prisma.user.findUnique(
                {
                    where: { id },
                    include: {
                        admin: true,
                        teacher: true,
                        student: true
                    }
                }
            )
            if (!existingUser) {
                throw { name: 'notFound' }
            }

            const updateUser = await prisma.user.update({
                where: {
                    id
                },
                data: {
                    role: 'admin'
                }
            })

            res.status(200).json({ message: `${updateUser.name} has been changed to admin` })

        } catch (error: unknown) {
            console.log(error);

            if (typeof error === 'object' && error !== null && 'name' in error) {
                const err = error as { name: string };

                if (err.name === "notFound") {
                    res.status(400).json({ message: "Data not found" });
                } else {
                    res.status(500).json({ message: "Internal Server Error" });
                }
            } else {
                res.status(500).json({ message: "Unknown Error" });
            }
        }
    }



    static async getAllTeachers(req: Request, res: Response) {
        try {
            const allTeachers = await prisma.user.findMany({
                where: { role: 'teacher' },
                include: { teacher: true }
            })

            const safeTeachers = allTeachers.map((user)=> exclude(user, ["password"]));

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

            const safeStudents = allStudents.map((user)=> exclude(user, ["password"]));

            res.status(200).json(safeStudents);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to fetch student users' });
        }
    }

}