import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { z } from "zod";
import { PrismaProfileRepository } from "~/applications/Profile/Infrastructure/PrismaUserRepository";
import { withAuthentication } from "~/libraries/nextauth/authConfig";
import { prisma } from "~/libraries/prisma";

const RequestSchema = z.object({
  phone: z.string().optional(),
  name: z.string().optional()
});

const profileRepository = new PrismaProfileRepository();

/**
 * Updates a user profile.
 *
 * Returns: Updated user
 */
export const PATCH = withAuthentication(async (request, ctx): Promise<NextResponse> => {
  const { id } = await (ctx.params as unknown as Promise<{ id: string }>);

  try {
    const payload = RequestSchema.parse(await request.json());

    const updatedProfile = await profileRepository.update({ id: id, ...payload });

    return NextResponse.json(updatedProfile, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ errors: error.errors }, { status: 400 });

    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
});

type PostReturn = NextResponse<{ image: string }>;

export const POST = withAuthentication(async (request, ctx): Promise<PostReturn> => {
  const { searchParams } = new URL(request.url);
  const { id } = await (ctx.params as unknown as Promise<{ id: string }>);

  const filename = searchParams.get("filename");

  if (!(filename && request.body)) throw new Error("filename or body empty.");

  const blob = await put(`users/${id}/profile/avatar/${filename}`, request.body, {
    access: "public"
  });

  const url = await prisma.user.update({ data: { image: blob.url }, where: { id: id } });
  return NextResponse.json({ image: url.image! });
});
