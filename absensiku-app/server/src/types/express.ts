import { Request } from 'express'

export type TypedRequestBody<T> = Request<{}, {}, T>


export interface LoginBody {
    email: string;
    password: string;
    role: 'admin' | 'teacher' | 'student';
}