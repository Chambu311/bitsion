import { hash, verify } from "@node-rs/argon2";
import "server-only";
import { manageSessionService } from "./manage-session";
import { prisma } from "@/lib/prisma";

class UserAuthenticationService {
  public async signUp(formData: FormData) {
    const email = formData.get("email");
    if (!email || typeof email !== "string") {
      throw new Error("Invalid email");
    }
    const password = formData.get("password");
    if (!password || typeof password !== "string") {
      throw new Error("Invalid password");
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await hash(password);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const token = manageSessionService.generateSessionToken();
    const session = await manageSessionService.createSession(token, user.id);

    return { token, expiresAt: session.expiresAt };
  }

  public async signIn(formData: FormData) {
    const email = formData.get("email");
    if (!email || typeof email !== "string") {
      throw new Error("Invalid email");
    }
    const password = formData.get("password");
    if (!password || typeof password !== "string") {
      throw new Error("Invalid password");
    }

    const userFound = await prisma.user.findUnique({
      where: { email },
    });

    if (!userFound) {
      throw new Error("Incorrect email or password");
    }

    const validPassword = await verify(userFound.password, password);
    if (!validPassword) {
      throw new Error("Incorrect email or password");
    }

    const token = manageSessionService.generateSessionToken();
    const session = await manageSessionService.createSession(token, userFound.id);

    return { token, expiresAt: session.expiresAt };
  }

  public async signOut(sessionId: string | undefined) {
    if (!sessionId) {
      return;
    }
    await manageSessionService.invalidateSession(sessionId);
  }
}

export const userAuthenticationService = new UserAuthenticationService();
