import {
    manageSessionService,
  } from "@/app/actions/user/use-cases/manage-session";
import { Session, User } from "@prisma/client";
  import { cookies } from "next/headers";
  import { cache } from "react";
  import "server-only";
  
  export async function setSessionTokenCookie(token: string, expiresAt: Date): Promise<void> {
    (await cookies()).set("session", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      expires: expiresAt,
      path: "/",
    });
  }
  
  export async function deleteSessionTokenCookie(): Promise<void> {
    (await cookies()).set("session", "", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 0,
      path: "/",
    });
  }
  
  export const validateRequest = cache(
    async (): Promise<SessionValidationResult> => {
      const token = (await cookies()).get("session")?.value ?? null;
      if (token === null) {
        return { session: null, user: null };
      }
      const result = await manageSessionService.validateSessionToken(token);
      return result;
    }
  );


  export interface SessionValidationResult {
    session: Session | null;
    user: User | null;
  }
  