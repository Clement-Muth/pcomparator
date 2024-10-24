"use server";

import { pcomparatorApiClient } from "~/clients/PcomparatorApiClient";
import { auth } from "~/libraries/nextauth/authConfig";

/**
 * `deleteAccount` deletes a user account.
 */
export const deleteAccount = async (): Promise<void> => {
  const session = await auth();

  await pcomparatorApiClient.delete(`user/${session?.user?.id}/account/delete`).json();
};
