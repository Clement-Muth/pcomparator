"use server";

import { z } from "zod";
import { pcomparatorApiClient } from "~/clients/PcomparatorApiClient";
import { auth } from "~/libraries/nextauth/authConfig";

const ParamsSchema = z.object({
  avatar: z.any()
});

const PayloadSchema = z.object({
  image: z.string()
});

/**
 * `updateAvatar` updates a user's avatar
 *
 * Returns: user's avatar
 *
 */
export const updateAvatar = async (params: z.infer<typeof ParamsSchema>): Promise<{ avatar: string }> => {
  const paramsPayload = ParamsSchema.parse(params);
  const session = await auth();

  const updatedUser = await pcomparatorApiClient
    .post(`user/${session?.user?.id}/profile?filename=${paramsPayload.avatar.name}`, {
      body: paramsPayload.avatar
    })
    .json();

  const updatedUserPayload = PayloadSchema.parse(updatedUser);

  return {
    avatar: updatedUserPayload.image
  };
};
