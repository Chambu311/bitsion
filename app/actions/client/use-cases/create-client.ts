import { prisma } from "@/lib/prisma";
import { Client } from "@prisma/client";
import { revalidatePath } from "next/cache";
import "server-only";
import { formDataToClientData } from "./update-client";

class CreateClientService {
  public async execute(formData: FormData, userId: string) {
    const clientInput = formDataToClientData(formData);
    const client = await prisma.client.create({
      data: {
        ...clientInput,
        additionalAttributes: clientInput.additionalAttributes
          ? JSON.parse(JSON.stringify(clientInput.additionalAttributes))
          : null,
        userId,
      },
    });
    revalidatePath("/home");
    return client;
  }
}

export const createClientService = new CreateClientService();

export type ICreateClient = Omit<Client, "id" | "createdAt" | "userId">;
