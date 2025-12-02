import database from "infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString()
  const version_postgres = await database.query("SELECT version()")
  // 1) Versão do Postgres
  // 2) Conexoes máximas
  // 3) Conexoes usadas
  // 4) Incrementar os testes para cobrir as informaçoes acima

  response
    .status(200)
    .json({
      updated_at: updateAt,
      version_postgres: version_postgres.rows[0].version
    });
}

export default status;
