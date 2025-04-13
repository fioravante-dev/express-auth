import jwt from "jsonwebtoken";

import prisma from "../../core/libs/prisma";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET ||"dev-access-secret";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET ||"dev-refresh-secret";
const ACCESS_EXPIRATION = "15m";
const REFRESH_EXPIRATION_DAYS = 7;

class TokenService {
  generateAccessToken(userId: string): string {
    return jwt.sign({ userId }, ACCESS_SECRET, {
      expiresIn: ACCESS_EXPIRATION,
    });
  }

  generateRefreshToken(userId: string): string {
    return jwt.sign({ userId }, REFRESH_SECRET, {
      expiresIn: `${REFRESH_EXPIRATION_DAYS}d`,
    });
  }
   //delete expired refresh tokens
    // await prisma.refreshToken.deleteMany({
    //   where: {
    //     userId: user.id,
    //     expiresAt: { lt: new Date() },
    //   },
    // });

  async storeRefreshToken(token: string, userId: string) {
    const expiresAt = new Date(
      Date.now() + REFRESH_EXPIRATION_DAYS * 24 * 60 * 60 * 1000
    );

    return prisma.refreshToken.create({
      data: {
        token,
        userId,
        expiresAt,
      },
    });
  }

  async replaceRefreshToken(
    oldToken: string,
    newToken: string,
    userId: string
  ) {
    await prisma.refreshToken.delete({ where: { token: oldToken } });
    return this.storeRefreshToken(newToken, userId);
  }

  async issueTokens(userId: string) {
    const accessToken = this.generateAccessToken(userId);
    const refreshToken = this.generateRefreshToken(userId);
    await this.storeRefreshToken(refreshToken, userId);
    return { accessToken, refreshToken };
  }
}

export default new TokenService();