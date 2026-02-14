import "server-only";

import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import type { NextAuthResult } from "next-auth";
import Google from "next-auth/providers/google";

import { getDb } from "./db";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "./db/schema";

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