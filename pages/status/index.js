import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1> Status </h1>
      <UpdateAt />
    </>
  );
}

function UpdateAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let database_info = "Carregando...";

  if (!isLoading && data) {
    console.log();
    //updateAtText = new Date(data.updated_at).toLocaleString("pt-BR");

    database_info = (
      <>
        <p>
          Ultima atualização:{" "}
          {new Date(data.depedencies.database.updated_at).toLocaleString(
            "pt-BR",
          )}
        </p>
        <p>Versão do Postgres: {data.depedencies.database.version_postgres}</p>
        <p>Conexões máximas: {data.depedencies.database.max_connections}</p>
        <p>Conexões usadas: {data.depedencies.database.used_connections}</p>
      </>
    );
  }

  return <div>{database_info} </div>;
}
