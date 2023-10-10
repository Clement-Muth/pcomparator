import { NextResponse } from "next/server";
import { storage } from "~/libraries/firebase/firestore";

export async function PUT(request: Request) {
  try {
    const pictureFile = (await request.formData()).get("file") as File;
    const buffer = Buffer.from(await pictureFile.arrayBuffer());

    const file = storage.bucket("gs://pricecomparator-b18c3.appspot.com/").file("reese.png");
    await file.save(buffer);

    return NextResponse.json({ message: "ok" }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Bad payload" }, { status: 400 });
  }
}
