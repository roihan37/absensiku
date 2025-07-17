export interface Admin {
  nip: string 
  nuptk: string 
}

export interface User {
    id? : number
    name: string
    username: string
    password: string
    email: string
    role: 'admin' | 'teacher' | 'student'
    gender: 'male' | 'female'
    phoneNumber: string
    address: string
    createdAt? : Date
    updatedAt? : Date
  }

