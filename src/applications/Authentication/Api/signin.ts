"use server";
import { pcomparatorApiClient } from "~/clients/PcomparatorApiClient";

/**
 * The `signin` function uses Google sign-in to authenticate a user asynchronously.
 *
 * Returns:
 *   The `signin` function is returning the result of calling the `signIn` function with the argument
 * "google".
 */
export const signin = async (): Promise<void> => {
  try {
    const { accessToken } = await pcomparatorApiClient
      .post("auth/login", {
        json: {
          username: process.env.OPEN_FOOD_FACTS_USERNAME,
          password: process.env.OPEN_FOOD_FACTS_PASSWORD
        }
      })
      .json<{ accessToken: string }>();

    console.log(accessToken);
  } catch (err) {
    console.log(err);
  }
};
