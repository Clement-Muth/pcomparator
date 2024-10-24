import { del, list } from "@vercel/blob";
import { prisma } from "~/libraries/prisma";

export const DELETE = async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  await prisma.user.delete({ where: { id } });

  const userAvatars = await list({ prefix: `users/${id}/profile/avatar/`, mode: "folded" });

  if (userAvatars.blobs.length > 0) await del(userAvatars.blobs.map((blob) => blob.url));

  return new Response(null, { status: 204 });
};
