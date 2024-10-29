import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
// import { OpenFoodFactsProductRepository } from "~/applications/Products/Infrastructure/Repositories/PrismaProductRepository";

// const productRepository = new OpenFoodFactsProductRepository();

export const POST = async (
  request: NextRequest,
  { params }: { params: Promise<{ barcode: string; format: string }> }
): Promise<NextResponse> => {
  const payload = await request.json();
  const { barcode } = await params;

  try {
    // await productRepository.createProof(payload.proof);

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) return NextResponse.json({ errors: error.errors }, { status: 400 });

    return NextResponse.json({ error: "Failed to get product" }, { status: 500 });
  }
};

export const GET = async (
  _: any,
  { params }: { params: Promise<{ barcode: string; format: string }> }
): Promise<NextResponse> => {
  const { barcode, format } = await params;

  try {
    // const product = await productRepository.findByBarcode({ barcode: barcode, format: format });

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ errors: error.errors }, { status: 400 });

    return NextResponse.json({ error: "Failed to get product" }, { status: 500 });
  }
};
