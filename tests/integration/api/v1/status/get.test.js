test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json()
  // expect(responseBody.updated_at).toBeDefined();
  // expect(responseBody.version_postgres).toBeDefined();
  // expect(responseBody.max_connections).toBeDefined();
  // expect(responseBody.used_connetions).toBeDefined();

  const parseUpdateAt = new Date(responseBody.depedencies.database.updated_at).toISOString();
  expect(responseBody.depedencies.database.updated_at).toEqual(parseUpdateAt)
  expect(responseBody.depedencies.database.version_postgres).toEqual('16.0')
  expect(responseBody.depedencies.database.max_connections).toEqual("100")
  expect(responseBody.depedencies.database.used_connections).toEqual(1)

});

test.only("Acessar o banco de dados por inject Sql", async () => {
  // await fetch("http://localhost:3000/api/v1/status?databaseName=local_db");
  await fetch("http://localhost:3000/api/v1/status?databaseName='; SELECT pg_sleep(1); --");
});
