import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";

export default async function migrations(req, res) {
  if (!["GET", "POST"].includes(req.method)) {
    return res.status(405).end();
  }

  const dbClient = await database.getNewClient();

  try {
    const migrations = await migrationRunner({
      dbClient,
      dryRun: req.method === "GET",
      dir: join(process.cwd(), "infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    });

    return res.status(200).json(migrations);
  } catch (error) {
    console.error("Migration failed:", error);

    return res.status(500).json({
      error: "Migration failed",
      message: error.message,
    });
  } finally {
    await dbClient.end();
  }
}
