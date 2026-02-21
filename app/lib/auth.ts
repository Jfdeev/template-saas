import "server-only";

import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import type { NextAuthResult } from "next-auth";
import Google from "next-auth/providers/google";
import { and, eq } from "drizzle-orm";

import { getDb } from "@/backend/infra/db";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "@/backend/infra/db/schema";

let cachedNextAuth: ReturnType<typeof NextAuth> | null = null;

function getNextAuth() {
  if (cachedNextAuth) return cachedNextAuth;

  const db = getDb();
  cachedNextAuth = NextAuth({
    secret: process.env.AUTH_SECRET,
    providers: [
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    ],
    adapter: DrizzleAdapter(db, {
      usersTable: users,
      accountsTable: accounts,
      sessionsTable: sessions,
      verificationTokensTable: verificationTokens,
    }),
    events: {
      createUser: async ({ user }) => {
        // Primeiro login (primeira criação do usuário): dá 1 crédito grátis.
        // Não sobrescreve caso já tenha sido ajustado manualmente.
        if (!user?.id) return;
        await db
          .update(users)
          .set({ creditsBalance: 1 })
          .where(and(eq(users.id, user.id), eq(users.creditsBalance, 0)));
      },
    },
  });

  return cachedNextAuth;
}

export const handlers = {
  GET: (...args: Parameters<ReturnType<typeof NextAuth>["handlers"]["GET"]>) =>
    getNextAuth().handlers.GET(...args),
  POST: (...args: Parameters<ReturnType<typeof NextAuth>["handlers"]["POST"]>) =>
    getNextAuth().handlers.POST(...args),
};

export const auth = ((...args: unknown[]) =>
  (getNextAuth().auth as (...args: unknown[]) => unknown)(...args)) as NextAuthResult["auth"];

export const signIn = (...args: Parameters<ReturnType<typeof NextAuth>["signIn"]>) =>
  getNextAuth().signIn(...args);

export const signOut = (...args: Parameters<ReturnType<typeof NextAuth>["signOut"]>) =>
  getNextAuth().signOut(...args);
