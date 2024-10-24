"use server";

import { z } from "zod";
import { pcomparatorApiClient } from "~/clients/PcomparatorApiClient";
import { auth } from "~/libraries/nextauth/authConfig";

const ParamsSchema = z.object({
  fullname: z.string()
});

/**
 * `updateFullname` updates the fullname of a user profile
 *
 * Args: `fullname`: string
 */
export const updateFullname = async (params: z.infer<typeof ParamsSchema>): Promise<void> => {
  const paramsPayload = ParamsSchema.parse(params);
  const session = await auth();

  await pcomparatorApiClient
    .patch(`user/${session?.user?.id}/profile`, {
      json: { name: paramsPayload.fullname }
    })
    .json();
};
