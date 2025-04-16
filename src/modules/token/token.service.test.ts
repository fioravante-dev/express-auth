import "reflect-metadata";
import { describe, it, expect, vi, beforeEach} from "vitest";

vi.mock("../../core/libs/prisma", () => {
  return {
    default: {
      refreshToken: {
        deleteMany: vi.fn(), // mock do método que você vai testar
      },
    },
  };
});

import jwt from "jsonwebtoken";
import prisma from "../../core/libs/prisma";
import TokenService from "./token.service";
import { env } from "../../core/libs/utils/env";

const tokenService = new TokenService();

describe("TokenService - generateAccessToken", () => {
  it("should generate a valid access token that contains a userId", () => {
    const userId = "testUser123";
    const token = tokenService.generateAccessToken(userId);
    const decoded = jwt.verify(token, env.ACCESS_SECRET) as { userId: string };

    expect(decoded).toHaveProperty("userId", userId);
    expect(typeof token).toBe("string");
  });
});

describe("TokenService - generateRefreshToken", () => {
  it("should generate a valid refresh token that contains a userId", () => {
    const userId = "testUser123";
    const refreshToken = tokenService.generateRefreshToken(userId);
    const decoded = jwt.verify(refreshToken, env.REFRESH_SECRET) as { userId: string };

    expect(decoded).toHaveProperty("userId", userId);
    expect(typeof refreshToken).toBe("string");
  });
});

describe("TokenService - deleteRefreshToken", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // limpa os mocks antes de cada teste
  });

  it("calls prisma.refreshToken.deleteMany with the correct token", async () => {
    const fakeToken = "123456";

    await tokenService.deleteRefreshToken(fakeToken);

    expect(prisma.refreshToken.deleteMany).toHaveBeenCalledWith({
      where: { token: fakeToken },
    });
  });
});
