import { NextResponse } from "next/server";
import { z } from "zod";
import firestore from "~/libraries/firebase/firestore";

const schema = z.object({
  product_id: z.string(),
  name: z.string(),
  currency: z.enum(["eur", "dol"]),
  brand: z.string(),
  market: z.string(),
  price: z.number(),
  location: z.string(),
  unity: z.enum(["g", "ml", "unity", "unities-g", "unities-ml"]),
  category: z.string(),
  quantity: z.number(),
  image: z.string().nullable().optional()
});

export async function PUT(request: Request) {
  try {
    const data = schema.parse(await request.json());
    const doc = await firestore.collection("products").doc(data.product_id).set(data);

    return NextResponse.json(doc, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Bad payload" }, { status: 400 });
  }
}
