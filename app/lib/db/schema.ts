import {
  pgTable,
  text,
  timestamp,
  primaryKey,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

// Auth.js / NextAuth tables (Drizzle Adapter)
// We keep the canonical table names: users, accounts, sessions, verification_tokens

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),

  // App-specific fields
  hasPaidAccess: boolean("hasPaidAccess").notNull().default(false),
});

export const payments = pgTable("payments", {
  // We use the provider payment id as our primary key (ex: AbacatePay pix_char_...)
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  provider: text("provider").notNull().default("abacatepay"),
  billingType: text("billingType").notNull().default("PIX"),
  valueCents: integer("valueCents").notNull(),
  status: text("status"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

export const paymentWebhookEvents = pgTable("payment_webhook_events", {
  // Provider webhook event id
  id: text("id").primaryKey(),
  provider: text("provider").notNull(),
  event: text("event").notNull(),
  paymentId: text("paymentId"),
  receivedAt: timestamp("receivedAt", { mode: "date" }).notNull().defaultNow(),
});

export const accounts = pgTable(
  "accounts",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("sessions", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

export const schema = {
  users,
  accounts,
  sessions,
  verificationTokens,
  payments,
  paymentWebhookEvents,
};
