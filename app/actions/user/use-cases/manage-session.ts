import { prisma } from "@/lib/prisma";
import { SessionValidationResult } from "@/lib/auth";
import "server-only";
import { Session } from "@prisma/client";

class ManageSessionService {
  public generateSessionToken(): string {
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);
    const token = Buffer.from(bytes).toString('base64url');
    return token;
  }

  public async createSession(
    token: string,
    userId: string
  ): Promise<Session> {
    const sessionId = Buffer.from(token).toString('hex');
    const newSession: Session = {
      id: sessionId,
      userId,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    };
    await prisma.session.create({
      data: newSession,
    });
    return newSession;
  }

  public async validateSessionToken(
    token: string
  ): Promise<SessionValidationResult> {
    const sessionId = Buffer.from(token).toString('hex');
    const result = await prisma.session.findUnique({
      where: {
        id: sessionId,
      },
      include: {
        user: true,
      },
    });
    if (!result) {
      return { session: null, user: null };
    }
    const session = result;
    const user = result.user;
    if (Date.now() >= session.expiresAt.getTime()) {
      await prisma.session.delete({
        where: {
          id: session.id,
        },
      });
      return { session: null, user: null };
    }
    if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
      session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
      await prisma.session.update({
        where: {
          id: session.id,
        },
        data: {
          expiresAt: session.expiresAt,
        },
      });
    }
    return { session, user };
  }

  public async invalidateSession(sessionId: string): Promise<void> {
    await prisma.session.delete({
      where: {
        id: sessionId,
      },
    });
  }
}

export const manageSessionService = new ManageSessionService();
