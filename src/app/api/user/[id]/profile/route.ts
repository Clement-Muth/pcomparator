import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "~/libraries/prisma";

const RequestSchema = z.object({
  phone: z.string()
});

/**
 * Updates a user profile.
 *
 * Returns: Updated user
 */
export const PATCH = async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const payload = RequestSchema.parse(await request.json());

  const updatedUser = await prisma.user.update({ data: { phone: payload.phone }, where: { id: id } });

  return NextResponse.json(updatedUser);
};
