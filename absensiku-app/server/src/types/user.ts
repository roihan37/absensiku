export interface CreateUserBody {
    id? : number,
    name: string
    username: string
    password: string
    email: string
    role: 'admin' | 'teacher' | 'student'
    gender: 'male' | 'female'
    nip: string 
    nuptk: string 
    phoneNumber: string
    address: string,
    createdAt? : Date,
    updatedAt? : Date
  }