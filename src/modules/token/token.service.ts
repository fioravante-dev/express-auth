import jwt from "jsonwebtoken";
import { injectable } from "tsyringe";

import prisma from "../../core/libs/prisma";
import { env } from "../../core/libs/utils/env";

const ACCESS_EXPIRATION = "15m";
const REFRESH_EXPIRATION_DAYS = 7;

@injectable()
export default class TokenService {
  async issueUserTokens(userId: string) {
    const accessToken = this.generateAccessToken(userId);
    const refreshToken = this.generateRefreshToken(userId);
    await this.storeRefreshToken(refreshToken, userId);
    return { accessToken, refreshToken };
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
      return jwt.verify(token, env.ACCESS_SECRET);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async validateStoredRefreshToken(refreshToken: string): Promise<string> {
    try {
      jwt.verify(refreshToken, env.REFRESH_SECRET);
      const tokenInDb = await prisma.refreshToken.findUnique({
        where: { token: refreshToken },
      });

      if (!tokenInDb) {
        throw new Error("Invalid refresh token");
      }
      return tokenInDb.userId;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  private generateAccessToken(userId: string): string {
    return jwt.sign({ userId }, env.ACCESS_SECRET, {
      expiresIn: ACCESS_EXPIRATION,
    });
  }

  private generateRefreshToken(userId: string): string {
    return jwt.sign({ userId }, env.REFRESH_SECRET, {
      expiresIn: `${REFRESH_EXPIRATION_DAYS}d`,
    });
  }

  private async storeRefreshToken(token: string, userId: string) {
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
}
