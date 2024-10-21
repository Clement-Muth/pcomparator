"use server";

import z from "zod";
import { db } from "~/libraries/kysely/db";

const ParamsSchema = z.object({
  email: z.string(),
  name: z.string(),
  image: z.string()
});

export const signup = async (params: z.infer<typeof ParamsSchema>) => {
  try {
    const paramsPayload = ParamsSchema.parse(params);

    const isUserAlreadyExists = await db.selectFrom("users").selectAll().executeTakeFirst();

    if (!isUserAlreadyExists)
      return await db
        .insertInto("users")
        .values({ email: paramsPayload.email, name: paramsPayload.name, image: paramsPayload.image })
        .executeTakeFirstOrThrow();
    else throw new Error("User already exists", { cause: "USER_ALREADY_EXISTS" });
  } catch (err) {
    console.error(err);
  }
};
