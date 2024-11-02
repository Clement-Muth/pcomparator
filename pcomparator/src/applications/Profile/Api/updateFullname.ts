"use server";

import { HTTPError } from "ky";
import { z } from "zod";
import type { Profile } from "~/applications/Profile/Domain/Entities/Profile";
import { pcomparatorAuthenticatedApiClient } from "~/clients/PcomparatorApiClient";
import { auth } from "~/libraries/nextauth/authConfig";

const ParamsSchema = z.object({
  name: z.string().min(0).max(32)
});

const PayloadSchema = z.object({
  name: z.string().min(0).max(32)
});

export type UpdateFullnameParams = z.infer<typeof ParamsSchema>;
export type UpdateFullnamePayload = z.infer<typeof PayloadSchema>;

/**
 * Updates the authenticated user's full name.
 *
 * @async
 * @function updateFullname
 * @param {z.infer<typeof ParamsSchema>} params - The parameters containing the new name to update in the user profile.
 * @throws {Error} Throws an error if the user is not authenticated.
 * @throws {Error} Throws an error with the message "404 NOT FOUND" if the user is not found on the server.
 * @throws {HTTPError} Re-throws any other HTTP errors encountered during the request.
 * @returns {Promise<UpdateFullnamePayload>} Resolves to an object containing the updated name upon successful update.
 */
export const updateFullname = async (
  params: z.infer<typeof ParamsSchema>
): Promise<UpdateFullnamePayload> => {
  const paramsPayload = ParamsSchema.parse(params);
  const session = await auth();

  if (!session?.user?.id) throw new Error("User not authenticated");

  try {
    const userPayload = PayloadSchema.parse(
      await pcomparatorAuthenticatedApiClient
        .patch(`user/${session.user.id}/profile`, {
          json: { name: paramsPayload.name }
        })
        .json<Profile>()
    );

    return { name: userPayload.name };
  } catch (err) {
    if (err instanceof HTTPError) {
      switch (err.response.status) {
        case 404: {
          throw new Error("404 NOT FOUND");
        }
      }
    }
    throw err;
  }
};
