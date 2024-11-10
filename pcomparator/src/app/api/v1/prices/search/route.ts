import { NextResponse } from "next/server";
import { PrismaSearchRepository } from "~/applications/Searchbar/Infrastructure/Repositories/PrismaSearchRepository";
import { errorHandler } from "~/core/errorHandler";
import { withAuthentication } from "~/libraries/nextauth/authConfig";
import { HttpStatus } from "~/types/httpError";

const SearchRepository = new PrismaSearchRepository();

export const GET = withAuthentication(
  errorHandler(async (request): Promise<NextResponse> => {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("q") as string;

    const prices = await SearchRepository.search(search);

    return NextResponse.json(prices, { status: HttpStatus.OK });
  })
);
