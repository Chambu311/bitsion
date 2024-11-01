import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import "server-only";
import { ICreateClient } from "./create-client";

class UpdateClientService {
  public async deleteById(id: number) {
    await prisma.client.delete({
      where: { id },
    });
    revalidatePath("/home");
  }

  public async update(formData: FormData, clientId: number) {
    const client = formDataToClientData(formData);
    const updatedClient = await prisma.client.update({
      where: { id: clientId },
      data: {
        ...client,
      },
    });
    revalidatePath("/home");
  }
}

export const updateClientService = new UpdateClientService();


export function formDataToClientData(formData: FormData): ICreateClient {
  return {
    fullName: formData.get("fullName") as string,
    identification: formData.get("identification") as string,
    age: parseInt(formData.get("age") as string),
    gender: formData.get("gender") as string,
    isActive: formData.get("isActive") as string === "on",
    additionalAttributes: formData.get("additionalAttributes") as string,
    canDrive: formData.get("canDrive") as string === "on",
    wearsGlasses: formData.get("wearsGlasses") as string === "on",
    isDiabetic: formData.get("isDiabetic") as string === "on",
    otherIllness: formData.get("otherIllness") as string,
  };
}