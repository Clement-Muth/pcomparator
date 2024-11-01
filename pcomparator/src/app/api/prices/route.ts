import { NextResponse } from "next/server";
import { PrismaBrandRepository } from "~/applications/Prices/Infrastructure/Repositories/PrismaBrandRepository";
import { PrismaCategoryRepository } from "~/applications/Prices/Infrastructure/Repositories/PrismaCategoryRepository";
import { PrismaPriceRepository } from "~/applications/Prices/Infrastructure/Repositories/PrismaPriceRepository";
import { PrismaProductRepository } from "~/applications/Prices/Infrastructure/Repositories/PrismaProductRepository";
import { PrismaStoreRepository } from "~/applications/Prices/Infrastructure/Repositories/PrismaStoreRepository";
import { errorHandler } from "~/core/errorHandler";
import { withAuthentication } from "~/libraries/nextauth/authConfig";
import { ParamsSchema } from "./validator";

const categoryRepository = new PrismaCategoryRepository();
const productRepository = new PrismaProductRepository();
const storeRepository = new PrismaStoreRepository();
const priceRepository = new PrismaPriceRepository();
const brandRepository = new PrismaBrandRepository();

export const POST = withAuthentication(
  errorHandler(async (request): Promise<NextResponse> => {
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
  })
);
