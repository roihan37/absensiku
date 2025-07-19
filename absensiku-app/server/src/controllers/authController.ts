import { compare } from "bcryptjs";
import { Request, Response } from "express";
import { addRefreshTokenToWhitelist, deleteRefreshTokenById, findRefreshToken, revokeTokens, revokeTokensOnReuse } from "../auth/auth.services";
import { prisma } from "../config/prisma";
import { generateTokens } from "../utils/sendRefreshToken";


export class Controller {
    
    static async refreshToken(req: Request, res: Response) {
        try {
          const refreshToken = req.cookies.refreshToken;
      
          if (!refreshToken) {
            res.clearCookie('refreshToken');
            const error = new Error('Missing refresh token.');
            error.name = 'BadRequest';
            throw error;
          }
      
          const savedRefreshToken = await findRefreshToken(refreshToken);
      
          if (
            !savedRefreshToken ||
            savedRefreshToken.revoked === true ||
            Date.now() >= savedRefreshToken.expireAt.getTime()
          ) {
            await revokeTokensOnReuse(savedRefreshToken?.userId ?? -1);
            res.clearCookie('refreshToken');
            const error = new Error('Invalid or expired refresh token.');
            error.name = 'Unauthorized';
            throw error;
          }
      
          const user = await prisma.user.findUnique({ where: { id: savedRefreshToken.userId } });
      
          if (!user) {
            const error = new Error('User not found.');
            error.name = 'Unauthorized';
            throw error;
          }
      
          // Token Rotation
          await deleteRefreshTokenById(savedRefreshToken.id);
          const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);
          await addRefreshTokenToWhitelist({ refreshToken: newRefreshToken, userId: user.id });
      
          res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24, // 1 day
          });
      
          res.status(200).json({ accessToken });
        } catch (err) {
            if (err instanceof Error) {
              console.error('RefreshToken Error:', err);
        
              switch (err.name) {
                case 'BadRequest':
                  return res.status(400).json({ message: err.message });
                case 'Unauthorized':
                  return res.status(401).json({ message: err.message });
                default:
                  return res.status(500).json({ message: 'Internal Server Error' });
              }
            }
        
            // Fallback: jika err bukan instance Error
            return res.status(500).json({ message: 'Unknown error occurred' });
          }
        }

        static async revokeRefreshTokens(req : Request, res : Response){
          try {
            const { userId } = req.body;
            await revokeTokens(userId);
            res.json({ message: `Tokens revoked for user with id #${userId}` });
          } catch (err) {
            console.error('revokeRefreshTokens Error:', err);
            res.status(500).json({ message: 'Unknown error occurred' });
          }
        }
        
      
}