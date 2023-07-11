import { db, sql } from "~/libraries/kysely";

export async function seed() {
  const createTable = await db.schema
    .createTable("users")
    .ifNotExists()
    .addColumn("id", "serial", (cb) => cb.primaryKey())
    .addColumn("name", "varchar(255)", (cb) => cb.notNull())
    .addColumn("email", "varchar(255)", (cb) => cb.notNull().unique())
    .addColumn("image", "varchar(255)")
    .addColumn("created_at", sql`timestamp with time zone`, (cb) => cb.defaultTo(sql`current_timestamp`))
    .execute();
  const addUsers = await db
    .insertInto("users")
    .values([
      {
        name: "Clément Muth",
        email: "clementmuth@gmail.com",
        image: "https://pbs.twimg.com/profile_images/1576257734810312704/ucxb4lHy_400x400.jpg"
      }
    ])
    .execute();
  return {
    createTable,
    addUsers
  };
}
