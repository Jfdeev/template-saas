import {
  pgTable,
  text,
  timestamp,
  primaryKey,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),

  hasPaidAccess: boolean("hasPaidAccess").notNull().default(false),

  creditsBalance: integer("creditsBalance").notNull().default(0),
});

export const monitoredProducts = pgTable("monitored_products", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  url: text("url").notNull(),
  isActive: boolean("isActive").notNull().default(true),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

export const conceptualProducts = pgTable("conceptual_products", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  name: text("name").notNull(),
  category: text("category").notNull(),
  brand: text("brand").notNull(),
  model: text("model").notNull(),
  versionGeneration: text("versionGeneration").notNull(),

  storage: text("storage").notNull(),
  color: text("color").notNull(),
  voltage: text("voltage"),
  defaultCondition: text("defaultCondition").notNull(),

  marketRegion: text("marketRegion").notNull(),
  baseCurrency: text("baseCurrency").notNull(),

  collectionFrequencyMinutes: integer("collectionFrequencyMinutes").notNull(),
  monitorType: text("monitorType").notNull(),

  discoveryStatus: text("discoveryStatus").notNull().default("PENDING"),

  isActive: boolean("isActive").notNull().default(true),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

export const payments = pgTable("payments", {
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
  monitoredProducts,
  conceptualProducts,
};
