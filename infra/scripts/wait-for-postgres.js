const { exec } = require("node:child_process");
const { stdout } = require("node:child_process");
function checkPostgres() {
  exec("docker exec postgres-dev pg_isready", handleReturn);

  function handleReturn() {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkPostgres();
      return;
    }

    console.log("postgres está pronto e aceitando conxões");
  }
}

console.log("Aguadando postgres aceitar conexões ");
checkPostgres();
