import { prisma } from "../config/prisma";
import { hashToken } from "../utils/hashToken";

// used when we create a refresh token.
// a refresh token is valid for 30 days
// that means that if a user is inactive for more than 30 days, he will be required to log in again
export const addRefreshTokenToWhitelist = (
    {refreshToken, userId} : {refreshToken : string, userId : string}
    ) => {
    return prisma.refreshToken.create({
        data: {
            hashedToken: hashToken(refreshToken),
            userId,
            expireAt: new Date(Date.now() + 1000 * 60 * 60 * 24  ), // 1 days
          },
    })
}

// used to check if the token sent by the client is in the database.
export function findRefreshToken(token : string) {
    return prisma.refreshToken.findUnique({
      where: {
        hashedToken: hashToken(token),
      },
    });
  }

// soft delete tokens after usage.
export function deleteRefreshTokenById(id : string) {
    return prisma.refreshToken.update({
      where: {
        id,
      },
      data: {
        revoked: true,
      },
    });
  }

export function revokeTokens(userId : string) {
    return prisma.refreshToken.updateMany({
      where: {
        userId,
      },
      data: {
        revoked: true,
      },
    });
  }
  
  export async function revokeTokensOnReuse(userId: string) {
    return prisma.refreshToken.updateMany({
      where: {
        userId,
        revoked: false,
        expireAt: {
          gt: new Date(),
        },
      },
      data: {
        revoked: true,
      },
    });
  }
  
