import database from "infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString()

  // const versionPostgresResult = await database.query("SELECT version()")
  // const version_postgres = versionPostgresResult.rows[0].version

  const versionPostgresResult = await database.query("SHOW server_version;")
  const version_postgres = versionPostgresResult.rows[0].server_version

  const maxConnectionsResult = await database.query("SHOW max_connections")
  const max_connections = maxConnectionsResult.rows[0].max_connections

  const databaseName = request.query.databaseName;
  console.log(`Banco de dados selecionado : ${databaseName}`)
  // Não é igual o java que soma string com +
  //const usedConnetionsResult = await database.query("SELECT count(*)::int FROM pg_stat_activity WHERE datname ='" + databaseName + "';")
  // Utilizando place holder
  // const usedConnetionsResult = await database.query(`SELECT count(*)::int FROM pg_stat_activity WHERE datname = '${databaseName}';`)

  const usedConnetionsResult = await database.query(`SELECT count(*)::int FROM pg_stat_activity WHERE datname = '${databaseName}';`)

  const usedConnetions = usedConnetionsResult.rows[0].count

  console.log(usedConnetions)

  response
    .status(200)
    .json({
      depedencies: {
        database: {
          updated_at: updateAt,
          version_postgres: version_postgres,
          max_connections: max_connections,
          used_connections: usedConnetions

        },
      },
    });
}

export default status;
