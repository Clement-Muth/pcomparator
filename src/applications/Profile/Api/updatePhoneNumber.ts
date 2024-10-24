"use server";

import { z } from "zod";
import { pcomparatorApiClient } from "~/clients/PcomparatorApiClient";
import { auth } from "~/libraries/nextauth/authConfig";

const ParamsSchema = z.object({
  phone: z.string().optional()
});

/**
 * `updatePhoneNumber` updates the phone number of a user profile
 *
 * Args: `phone`: string
 */
export const updatePhoneNumber = async (params: z.infer<typeof ParamsSchema>): Promise<void> => {
  const paramsPayload = ParamsSchema.parse(params);
  const session = await auth();

  await pcomparatorApiClient
    .patch(`user/${session?.user?.id}/profile`, {
      json: {
        phone: paramsPayload.phone
      }
    })
    .json();
};
