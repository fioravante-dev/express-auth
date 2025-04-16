import jwt from "jsonwebtoken";
import { injectable } from "tsyringe";

import prisma from "../../core/libs/prisma";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "dev-access-secret";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "dev-refresh-secret";
const ACCESS_EXPIRATION = "15m";
const REFRESH_EXPIRATION_DAYS = 7;

@injectable()
export default class TokenService {
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

  async deleteRefreshToken(refreshToken: string) {
    await prisma.refreshToken.deleteMany({
      where: {
        token: refreshToken,
      },
    });
  }

  async deleteOldRefreshTokens(userId: string) {
    await prisma.refreshToken.deleteMany({
      where: {
        userId,
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }

  validateAccessToken(token: string) {
    try {
      return jwt.verify(token, ACCESS_SECRET);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async validateStoredRefreshToken(refreshToken: string): Promise<string> {
    try {
      jwt.verify(refreshToken, REFRESH_SECRET);
      const tokenInDb = await prisma.refreshToken.findUnique({
        where: { token: refreshToken },
      });

      if (!tokenInDb) {
        throw new Error("Refresh token not authortized");
      }
      return tokenInDb.userId;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async validateRefreshTokenInDB(refreshToken: string) {
    return await prisma.refreshToken.findUnique({
      where: {
        token: refreshToken,
      },
    });
  }

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

  async issueTokens(userId: string) {
    const accessToken = this.generateAccessToken(userId);
    const refreshToken = this.generateRefreshToken(userId);
    await this.storeRefreshToken(refreshToken, userId);
    return { accessToken, refreshToken };
  }
}