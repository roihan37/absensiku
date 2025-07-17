import { compare } from "bcryptjs";
import { prisma } from "../config/prisma";
import { LoginBody, TypedRequestBody } from "../types/express";
export class Controller {

    static async login(req: TypedRequestBody<LoginBody>, res: Response) {
        try {
            const { role, email, password } = req.body
            if (!email || !password) {
                throw { name: "badRequest" }
            }

            const user = prisma.user.findUnique(
                {
                    where: { email },
                    include: {
                        admin : true
                    }
                }
            )
            if (!user) {
                throw { name: "Unauthorized" }
            }
            console.log(user);


            // const comparePassword = compare(password, user)


        } catch (error) {

        }
    }
}