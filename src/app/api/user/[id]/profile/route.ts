import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "~/libraries/prisma";

const RequestSchema = z.object({
  phone: z.string().optional(),
  name: z.string().optional()
});

/**
 * Updates a user profile.
 *
 * Returns: Updated user
 */
export const PATCH = async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const payload = RequestSchema.parse(await request.json());

  const updatedUser = await prisma.user.update({
    data: { phone: payload.phone, name: payload.name },
    where: { id: id }
  });

  return NextResponse.json(updatedUser);
};

export const POST = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<string>> => {
  const { searchParams } = new URL(request.url);
  const { id } = await params;

  const filename = searchParams.get("filename");

  if (!(filename && request.body)) throw new Error("filename or body empty.");

  const blob = await put(`users/${id}/profile/avatar/${filename}`, request.body, {
    access: "public"
  });

  const url = await prisma.user.update({ data: { image: blob.url }, where: { id: id } });
  return NextResponse.json(url.image!);
};
