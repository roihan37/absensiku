import { CreateUserBody } from "../types/user";
import { TypedRequestBody } from "../types/express";
class Controller{

    static async createUser( 
        req: TypedRequestBody<CreateUserBody>, 
        res : Response
        ){
        const {
            name,
            username,
            password,
            email,
            role,
            gender,
            nip,
            nuptk,
            phoneNumber,
            address 
        } = req.body



    }
}