interface UserLogin {
    id: number;
    role : string
  }
  
declare global {
    namespace Express {
      interface Request {
        userLogin?: UserLogin;
      }
    }
  }

  
export interface LoginBody {
    email: string;
    password: string;
    role: 'admin' | 'teacher' | 'student';
}