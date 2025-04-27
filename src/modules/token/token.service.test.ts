import "reflect-metadata";
import { describe, it, expect, vi, beforeEach } from "vitest";

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

const serviceName = "TokenService - ";

beforeEach(() => {
  vi.clearAllMocks(); // limpa os mocks antes de cada teste
});

describe(serviceName + "issueUserTokens", () => {
  it("should issue valid access and refresh tokens and call storeRefreshToken", async () => {
    const userId = "testUser123";

    // Espiona o método interno que salva o token no banco
    const spy = vi
      .spyOn(tokenService as any, "storeRefreshToken")
      .mockResolvedValue(undefined);

    const { accessToken, refreshToken } = await tokenService.issueUserTokens(
      userId
    );

    // Verifica se são strings
    expect(typeof accessToken).toBe("string");
    expect(typeof refreshToken).toBe("string");

    // Verifica se o conteúdo dos tokens é válido
    const decodedAccess = jwt.verify(accessToken, env.ACCESS_SECRET);
    const decodedRefresh = jwt.verify(refreshToken, env.REFRESH_SECRET);

    expect((decodedAccess as any).userId).toBe(userId);
    expect((decodedRefresh as any).userId).toBe(userId);

    // Verifica se o método de armazenamento foi chamado corretamente
    expect(spy).toHaveBeenCalledWith(refreshToken, userId);
  });
});

describe(serviceName + "deleteRefreshToken", () => {
  it("calls prisma.refreshToken.deleteMany with the correct token", async () => {
    const fakeToken = "123456";

    await tokenService.deleteRefreshToken(fakeToken);

    expect(prisma.refreshToken.deleteMany).toHaveBeenCalledWith({
      where: { token: fakeToken },
    });
  });
});

describe(serviceName + "deleteOldRefreshTokens", () => {
  it("calls prisma.refreshToken.deleteMany with the correct userId", async () => {
    const fakeUserId = "123456";
    await tokenService.deleteOldRefreshTokens(fakeUserId);

    expect(prisma.refreshToken.deleteMany).toHaveBeenCalledWith({
      where: {
        userId: fakeUserId,
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  });
});

describe(serviceName + "validateAccessToken", () => {
  it("should return decoded token when valid", () => {
    const token = jwt.sign({ userId: "123" }, env.ACCESS_SECRET);
    const decoded = tokenService.validateAccessToken(token);
    expect(decoded).toHaveProperty("userId", "123");
  });

  it("should throw error when token is invalid", () => {
    const invalidToken = "invalid-token";
    expect(() => tokenService.validateAccessToken(invalidToken)).toThrow(
      "jwt malformed"
    );
  });
})


