import { NextResponse } from "next/server";
import { z } from "zod";
import { Product } from "~/app/api/types/product";
import firestore from "~/libraries/firebase/firestore";

export async function GET(request: Request) {
  try {
    const docs = await firestore.collection("categories").get();

    return NextResponse.json(
      docs.docs.map((doc) => doc.data()),
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Bad payload" }, { status: 400 });
  }
}
