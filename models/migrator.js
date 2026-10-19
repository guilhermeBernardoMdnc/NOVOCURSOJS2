const defaultMigrationOption = {
  dryRun: true, 
  dir: resolve("infra", "migrations"),
  direction: "up",
  verbose: true,
  migrationsTable: "pgmigrations",
}