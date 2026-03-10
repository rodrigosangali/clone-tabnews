import migrationRunner from "node-pg-migrate";

export default async function migrations(request, response) {

  console.log(process.env.development.DATABASE_URL)
  const migrations = await migrationRunner({
    databaseUrl: process.env.development.DATABASE_URL,
    dryRun: true,
  });

  response.status(200).json(migrations);

}
