import "server-only";

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import { schema } from "./schema";

let cachedDb: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
  if (cachedDb) return cachedDb;

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("Missing DATABASE_URL environment variable");
  }

  const sql = neon(databaseUrl);

  // drizzle-orm/neon-http expects a callable client(query, params, options)
  // Neon v1+ requires conventional calls to go through sql.query(...)
  // while still exposing sql.transaction for batch operations.
  const client = Object.assign(
    (query: string, params: unknown[], options?: unknown) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (sql.query as any)(query, params, options),
    {
      query: sql.query.bind(sql),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      unsafe: (sql as any).unsafe?.bind(sql),
      transaction: sql.transaction.bind(sql),
    }
  );

  // drizzle's NeonQueryFunction typing expects the full Neon client shape.
  // At runtime, drizzle only needs a callable client + transaction.
  cachedDb = drizzle(client as never, { schema });
  return cachedDb;
}
