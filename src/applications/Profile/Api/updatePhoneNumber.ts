"use server";

import { z } from "zod";
import { pcomparatorApiClient } from "~/clients/PcomparatorApiClient";
import { auth } from "~/libraries/nextauth/authConfig";

const ParamsSchema = z.object({
  phone: z.string().optional()
});

const PayloadSchema = z.object({
  id: z.string(),
  phone: z.string(),
  name: z.string(),
  email: z.string(),
  image: z.string()
});

/**
 * `updatePhoneNumber` updates the phone number of a user profile
 *
 * Args: `phone`: string
 *
 * Returns: Updated user
 */
export const updatePhoneNumber = async (params: z.infer<typeof ParamsSchema>): Promise<any> => {
  const paramsPayload = ParamsSchema.parse(params);
  const session = await auth();

  const updatedUser = await pcomparatorApiClient
    .patch(`user/${session?.user?.id}/profile`, {
      json: {
        phone: paramsPayload.phone
      }
    })
    .json();

  const updatedUserPayload = PayloadSchema.parse(updatedUser);

  return {
    phone: updatedUserPayload.phone
  };
};
