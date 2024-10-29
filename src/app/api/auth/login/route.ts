import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { PcomparatorAuthRepository } from "~/applications/Authentication/Infrastructure/PcomparatorAuthRepository";

const ParamsSchema = z.object({
  username: z.string(),
  password: z.string()
});

const authRepository = new PcomparatorAuthRepository();

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const payload = ParamsSchema.parse(await request.json());

    const { accessToken } = await authRepository.signin(payload.username, payload.password);

    return NextResponse.json({ accessToken }, { status: 200 });
  } catch (error) {
    console.log(error);
    throw error;
    // if (error instanceof z.ZodError) return NextResponse.json({ errors: error.errors }, { status: 400 });

    // return NextResponse.json({ error: "Failed to get product" }, { status: 500 });
  }
};
