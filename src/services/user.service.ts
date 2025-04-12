import bcrypt from "bcrypt";

import prisma from "../libs/prisma";
import { generateToken } from "../libs/jwt";

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

class UserService {
  async createUser({ name, email, password }: CreateUserInput) {
    //check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error("User already exists");
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    //remove password from user object
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Invalid email or password");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid email or password");

    const token = generateToken({ id: user.id, email: user.email });

    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
      expiresIn: "1d",
    };
  }
}

export default new UserService();