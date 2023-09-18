import { NextResponse } from "next/server";
import { z } from "zod";
import firestore from "~/libraries/firebase/firestore";

const schemaGet = z.object({
  product_id: z.string()
});

export async function GET(request: Request) {
  try {
    const doc = await firestore
      .collection("products")
      .doc(request.url.substring(request.url.lastIndexOf("/") + 1))
      .get();

    return NextResponse.json(doc.data(), { status: 200 });
  } catch (e) {
    console.error(e);
    // return NextResponse.json({ error: "Bad payload" }, { status: 400 });
  }
}
