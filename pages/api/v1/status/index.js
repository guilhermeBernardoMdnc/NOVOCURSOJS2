import database from "infra/database.js";
import { InternalServerError } from "next/error";

async function status(req, res) {
  try{

 
  const updateAt = new Date().toISOString();

  const databaseVersionResult = await database.query("SHOW server_version;");

  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseVersion = databaseVersionValue.split(" ")[0];

  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );

  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;

  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResult.rows[0].count;

  res.status(200).json({
    update_at: updateAt,
    dependecies: {
      database: {
        version: databaseVersion,
        max_connections: parseInt(databaseMaxConnectionsValue),
        opened_connections: databaseOpenedConnectionsValue,
      },
    },
  });
   } catch(error){
     const publicErrorObject = new InternalServerError({
      cause: error
     });

    console.log('\n Erro dentro do catch do controller: ')
    console.error(publicErrorObject)

    res.status(500).json({error: "Internal Server Error"})
   }
}

export default status;
