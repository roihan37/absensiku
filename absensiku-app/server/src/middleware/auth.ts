import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma'; // sesuaikan path-mu
import { decoded } from '../utils/jwt';

interface ResultToken {
  id: string
  role : string;
  
}


export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid Authorization header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const resultToken =  decoded(token) as ResultToken
    const user = await prisma.user.findUnique({
      where: { id: resultToken.id } 
    });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.userLogin = {
        id : user.id,
        role : user.role
    } 

    next();
  } catch (err) {
    
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
