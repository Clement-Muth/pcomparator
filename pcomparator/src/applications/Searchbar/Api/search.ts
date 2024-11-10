"use server";

import { z } from "zod";
import { pcomparatorAuthenticatedApiClient } from "~/clients/PcomparatorApiClient";

const ParamsSchema = z.object({
  search: z.string({ message: "This field is requried" }).min(1, "This field is required")
});

export const search = async (
  _: any,
  data: FormData
): Promise<{ success: boolean; search: string; prices?: any[]; errors?: any }> => {
  try {
    const formData = Object.fromEntries(data);
    const payload = ParamsSchema.safeParse(formData);

    if (!payload.success) {
      return {
        success: false,
        search: "",
        errors: payload.error.flatten()
      };
    }

    const res = (
      await pcomparatorAuthenticatedApiClient.get("/v1/prices/search", {
        params: { query: { q: payload.data.search } }
      })
    ).data;

    return { success: true, prices: res, search: payload.data.search };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
