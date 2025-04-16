import bcrypt from "bcrypt";
import { injectable, inject } from "tsyringe";

import prisma from "../../core/libs/prisma";
import TokenService from "../token/token.service";

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

@injectable()
export default class AuthService {
  constructor(
    @inject(TokenService) private tokenService: TokenService
  ){}

  async createUser({ name, email, password }: CreateUserInput) {
    //check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error("User already exists");
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    //remove password from user object
    const { password: _, createdAt, updatedAt, ...userWithoutPassword } = user;

    //generate access and refresh tokens and also store refresh token in db
    const { accessToken, refreshToken } = await this.tokenService.issueTokens(
      user.id
    );

    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    };
  }

  async login(email: string, password: string) {
    //email and password inputs are checked by middlerware

    //check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Invalid email or password");
    //check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid email or password");

    //generate access and refresh tokens and also store refresh token in db
    const { accessToken, refreshToken } = await this.tokenService.issueTokens(
      user.id
    );

    const { password: _, createdAt, updatedAt, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, accessToken, refreshToken };
  }

  async refresh(refreshToken: string) {
    const userId = await this.tokenService.validateStoredRefreshToken(refreshToken);
    await this.tokenService.deleteRefreshToken(refreshToken);
    const { accessToken, refreshToken: newRefreshToken } = await this.tokenService.issueTokens(userId);
    return { accessToken, refreshToken: newRefreshToken };
  }

  async logout(refreshToken: string) {
    await this.tokenService.validateStoredRefreshToken(refreshToken);
    await this.tokenService.deleteRefreshToken(refreshToken);
    return { message: "Logged out successfully" };
  }
}
