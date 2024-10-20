"use server";

import { signIn } from "~/libraries/nextauth/authConfig";

/**
 * The `signin` function uses Google sign-in to authenticate a user asynchronously.
 *
 * Returns:
 *   The `signin` function is returning the result of calling the `signIn` function with the argument
 * "google".
 */
export const signin = async () => {
  return await signIn("google");
};
