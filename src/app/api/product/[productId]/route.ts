import { NextResponse } from "next/server";
import { db } from "~/libraries/kysely";
import { seed } from "~/libraries/kysely/seed";

export async function PUT(request: Request) {
  const data = await request.json();

  await seed();
  await db.insertInto("products").values(data).execute();

  return NextResponse.json({ status: 200 });
}
