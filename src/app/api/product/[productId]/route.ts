import { NextResponse } from "next/server";
import { db } from "~/libraries/kysely";
import { seed } from "~/libraries/kysely/seed";

export async function PUT(request: Request) {
  console.log(request.body);

  return NextResponse.json({ status: 200 });
}
