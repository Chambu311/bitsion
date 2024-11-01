import { prisma } from "@/lib/prisma";
import "server-only";

class GetClientService {
  public async executeByUserId(userId: string) {
    const clients = await prisma.client.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return clients;
  }
  public async executeById(id: number) {
    const client = await prisma.client.findUnique({
      where: { id },
    });
    return client;
  }
}

export const getClientService = new GetClientService();