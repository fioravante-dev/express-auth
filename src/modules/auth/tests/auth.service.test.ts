import "reflect-metadata";
import { describe, it, expect, vi, beforeEach } from "vitest";
import bcrypt from "bcrypt";

import AuthService from "../auth.service";
import TokenService from "../../token/token.service";
import prisma from "../../../core/libs/prisma";

const tokenService = {
  issueUserTokens: vi.fn(),
};

const authService = new AuthService(tokenService as unknown as TokenService);

const serviceName = "AuthService - ";

vi.mock("bcrypt");

describe(serviceName + "login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("throws error if user does not exist", async () => {
    vi.spyOn(prisma.user, "findUnique").mockResolvedValue(null);

    await expect(authService.login("nao@existe.com", "senha")).rejects.toThrow(
      "Invalid email or password"
    );
  });

  it("throws error if password is incorrect", async () => {
    vi.spyOn(prisma.user, "findUnique").mockResolvedValue({
      id: "user123",
      email: "user@teste.com",
      password: "senha-hash",
    } as any);

    vi.mocked(bcrypt.compare).mockResolvedValue();

    await expect(
      authService.login("user@teste.com", "senhaErrada")
    ).rejects.toThrow("Invalid email or password");
  });

  it("returns an object with secure user and tokens", async () => {
    const fakeUser = {
      id: "user123",
      email: "user@teste.com",
      name: "User",
      password: "senha-hash",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.spyOn(prisma.user, "findUnique").mockResolvedValue(fakeUser as any);
    vi.mocked(bcrypt.compare).mockResolvedValue();
    tokenService.issueUserTokens.mockResolvedValue({
      accessToken: "accessToken",
      refreshToken: "refreshToken",
    });

    const result = await authService.login("user@teste.com", "senha123");

    expect(result.user).toEqual({
      id: "user123",
      email: "user@teste.com",
      name: "User",
    });
    expect(result.accessToken).toBe("access.token");
    expect(result.refreshToken).toBe("refresh.token");
  });
});
