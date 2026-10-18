export async function up(pgm) {
  pgm.createTable("users", {
    id: "id",
    name: {
      type: "varchar(50)",
      notNull: true,
    },
  });
}

export async function down(pgm) {
  pgm.dropTable("users");
}
