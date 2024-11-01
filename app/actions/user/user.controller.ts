/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { validateRequest, setSessionTokenCookie, deleteSessionTokenCookie } from "@/lib/auth";
import { userAuthenticationService } from "./use-cases/authentication";
import { getUserService } from "./use-cases/get-user";

export async function signUp(formData: FormData) {
  try {
    const { token, expiresAt } = await userAuthenticationService.signUp(formData);
    await setSessionTokenCookie(token, expiresAt);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function signIn(formData: FormData) {
  try {
    const { token, expiresAt } = await userAuthenticationService.signIn(formData);
    await setSessionTokenCookie(token, expiresAt);
    return true;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function signOut() {
  const { session } = await validateRequest();
  if (!session) {
    return false;
  }
  try {
    await userAuthenticationService.signOut(session.id);
    await deleteSessionTokenCookie();
    return true;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getUser() {
  const { user } = await validateRequest();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return await getUserService.executebyEmail(user.email);
}

export async function getLoggedInUser() {
  const { user } = await validateRequest();
  if (!user) {
    return null;
  }
  return user;
}
