"use server";
import { validateRequest } from "@/lib/auth";
import { createClientService } from "./use-cases/create-client";
import { getClientService } from "./use-cases/get-client";
import { redirect } from "next/navigation";
import { updateClientService } from "./use-cases/update-client";

export async function createClient(formData: FormData) {
  const { user } = await validateRequest();
  if (!user) {
    throw new Error("Unauthorized");
  }
  try {
    await createClientService.execute(formData, user.id);
  } catch (error) {
    console.error(error);
  }
}

export async function updateClient(formData: FormData, clientId: number) {
  const { user } = await validateRequest();
  if (!user) {
    throw new Error("Unauthorized");
  }
  await updateClientService.update(formData, clientId);
}

export async function getAllClients() {
  const { user } = await validateRequest();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return getClientService.executeByUserId(user.id);
}

export async function getClientById(id: number) {
  const { user } = await validateRequest();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return getClientService.executeById(id);
}


export async function deleteClient(id: number) {
  const { user } = await validateRequest();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return updateClientService.deleteById(id);
}
