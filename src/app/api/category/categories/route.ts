import { NextResponse } from "next/server";
import firestore from "~/libraries/firebase/firestore";

export async function GET(_request: Request) {
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
