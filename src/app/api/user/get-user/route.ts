import { NextResponse } from "next/server";
import { db } from "~/libraries/kysely";
import { seed } from "~/libraries/kysely/seed";

export async function GET(request: Request) {
  let users;
  let startTime = Date.now();

  try {
    users = await db.selectFrom("users").selectAll().execute();
  } catch (e) {
    if ((e as { message: string }).message === `relation "users" does not exist`) {
      await seed();
      startTime = Date.now();
      users = await db.selectFrom("users").selectAll().execute();
    } else {
      throw e;
    }
  }

  return NextResponse.json(users, { status: 200 });
}
