import { NextResponse } from "next/server";
import { z } from "zod";
import { Currency } from "~/applications/Prices/Domain/ValueObjects/Currency";
import { PrismaBrandRepository } from "~/applications/Prices/Infrastructure/Repositories/PrismaBrandRepository";
import { PrismaCategoryRepository } from "~/applications/Prices/Infrastructure/Repositories/PrismaCategoryRepository";
import { PrismaPriceRepository } from "~/applications/Prices/Infrastructure/Repositories/PrismaPriceRepository";
import { PrismaProductRepository } from "~/applications/Prices/Infrastructure/Repositories/PrismaProductRepository";
import { PrismaStoreRepository } from "~/applications/Prices/Infrastructure/Repositories/PrismaStoreRepository";
import { withAuthentication } from "~/libraries/nextauth/authConfig";

const ParamsSchema = z.object({
  barcode: z.string(),
  storeName: z.string(),
  productName: z.string(),
  categoryName: z.string(),
  brandName: z.string(),
  location: z.string(),
  amount: z.number().positive(),
  proof: z.string(),
  currency: z.nativeEnum(Currency)
});

const categoryRepository = new PrismaCategoryRepository();
const productRepository = new PrismaProductRepository();
const storeRepository = new PrismaStoreRepository();
const priceRepository = new PrismaPriceRepository();
const brandRepository = new PrismaBrandRepository();

export const POST = withAuthentication(async (request: Request): Promise<NextResponse> => {
  try {
    const paramsPayload = ParamsSchema.parse(await request.json());

    const category = await categoryRepository.findOrCreate(paramsPayload.categoryName, {
      description: "",
      name: paramsPayload.categoryName
    });

    const brand = await brandRepository.findOrCreate(paramsPayload.brandName, {
      description: "",
      name: paramsPayload.brandName
    });

    const product = await productRepository.findOrCreate(paramsPayload.barcode, {
      name: paramsPayload.productName,
      categoryId: category.id,
      brandId: brand.id,
      barcode: paramsPayload.barcode
    });

    const store = await storeRepository.findOrCreate(paramsPayload.location, paramsPayload.storeName, {
      location: paramsPayload.location,
      name: paramsPayload.storeName
    });

    await priceRepository.create({
      productId: product.id,
      storeId: store.id,
      amount: paramsPayload.amount,
      currency: paramsPayload.currency,
      priceProofImage: paramsPayload.proof
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }

    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
});
