import "server-only";
import { prisma } from "@/lib/prisma";

class GetUserService {
  public async executeById(userId: string) {
    const userFound = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return userFound;
  }

  public async executebyEmail(email: string) {
    const userFound = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return userFound;
  }
}

export const getUserService = new GetUserService();
