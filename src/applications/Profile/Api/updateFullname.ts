"use server";

import { z } from "zod";
import { pcomparatorApiClient } from "~/clients/PcomparatorApiClient";
import { auth } from "~/libraries/nextauth/authConfig";

const ParamsSchema = z.object({
  fullname: z.string()
});

const PayloadSchema = z.object({
  name: z.string()
});

/**
 * `updateFullname` updates the fullname of a user profile
 *
 * Args: `fullname`: string
 *
 * Returns: Updated user
 */
export const updateFullname = async (params: z.infer<typeof ParamsSchema>): Promise<any> => {
  const paramsPayload = ParamsSchema.parse(params);
  const session = await auth();

  const updatedUser = await pcomparatorApiClient
    .patch(`user/${session?.user?.id}/profile`, {
      json: {
        name: paramsPayload.fullname
      }
    })
    .json();

  const updatedUserPayload = PayloadSchema.parse(updatedUser);

  return {
    fullname: updatedUserPayload.name
  };
};
