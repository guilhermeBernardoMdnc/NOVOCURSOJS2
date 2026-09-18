const { exec } = require("node:child_process");

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready", handleReturn);
}

function handleReturn(error, stdout, stderr) {
  if (error) {
    console.log("Postgres ainda não está pronto...");
    setTimeout(checkPostgres, 1000);
    return;
  }

  if (stdout.search("accepting connections") === -1) {
    process.stdout.write(".");
    setTimeout(checkPostgres, 1000);
    return;
  }

  console.log("Postgres está pronto e aceitando conexões");
}

console.log("Aguardando postgres aceitar conexões");
checkPostgres();
