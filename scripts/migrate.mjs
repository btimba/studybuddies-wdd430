import { readdir, readFile } from "node:fs/promises";
import { Client } from "pg";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in the environment or .env.local");
}

const client = new Client({ connectionString: process.env.DATABASE_URL });
const migrationLockId = 732184021;

await client.connect();
let lockAcquired = false;

try {
  await client.query("SELECT pg_advisory_lock($1)", [migrationLockId]);
  lockAcquired = true;

  const schema = await readFile(new URL("../lib/schema.sql", import.meta.url), "utf8");
  await client.query(schema);
  await client.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      name TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  const migrationDirectory = new URL("../migrations/", import.meta.url);
  const migrationFiles = (await readdir(migrationDirectory))
    .filter((file) => /^\d+_.+\.sql$/.test(file))
    .sort();

  for (const name of migrationFiles) {
    const result = await client.query(
      "SELECT 1 FROM schema_migrations WHERE name = $1",
      [name],
    );

    if (result.rowCount !== 0) {
      continue;
    }

    const migration = await readFile(new URL(name, migrationDirectory), "utf8");
    await client.query("BEGIN");

    try {
      await client.query(migration);
      await client.query("INSERT INTO schema_migrations (name) VALUES ($1)", [name]);
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    }

    console.log(`Applied migration: ${name}`);
  }
} finally {
  try {
    if (lockAcquired) {
      await client.query("SELECT pg_advisory_unlock($1)", [migrationLockId]);
    }
  } finally {
    await client.end();
  }
}
