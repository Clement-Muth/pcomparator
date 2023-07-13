import { db, sql } from "~/libraries/kysely";

export async function seed() {
  const createUsersTable = await db.schema
    .createTable("users")
    .ifNotExists()
    .addColumn("id", "serial", (cb) => cb.primaryKey())
    .addColumn("name", "varchar(255)", (cb) => cb.notNull())
    .addColumn("email", "varchar(255)", (cb) => cb.notNull().unique())
    .addColumn("image", "varchar(255)")
    .addColumn("created_at", sql`timestamp with time zone`, (cb) => cb.defaultTo(sql`current_timestamp`))
    .execute();
  const createProductsTable = await db.schema
    .createTable("products")
    .ifNotExists()
    .addColumn("id", "serial", (cb) => cb.primaryKey())
    .addColumn("name", "varchar(255)", (cb) => cb.notNull())
    .addColumn("price", "float8", (cb) => cb.notNull())
    .addColumn("created_at", sql`timestamp with time zone`, (cb) => cb.defaultTo(sql`current_timestamp`))
    .execute();

  return {
    createUsersTable,
    createProductsTable
  };
}
