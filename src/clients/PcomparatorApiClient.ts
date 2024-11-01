// import { addBreadcrumb as sentryAddBreadcrumb } from "@sentry/nextjs";
import ky, { type NormalizedOptions } from "ky";
import { HTTPError as HTTPErrorKy } from "ky";
import { headers } from "next/headers";
import { HTTPError } from "~/types/error";

const pcomparatorApiEndpoint = process.env.PCOMPARATOR_API_ENDPOINT;
if (!pcomparatorApiEndpoint) {
  throw new Error("The environment variable 'PCOMPARATOR_API_ENDPOINT' is missing");
}

export const pcomparatorApiClient = ky.create({
  retry: 1,

  prefixUrl: `${process.env.PCOMPARATOR_API_ENDPOINT}/api/`,

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },

  hooks: {
    beforeRequest: [],

    beforeError: [(error) => error],

    afterResponse: [
      (request: Request, options: NormalizedOptions, response: Response) => response,

      (request: Request, options: NormalizedOptions, response: Response) => {
        // Transform 202 into error to allow retry at higher level
        if (response.status === 202) throw new HTTPErrorKy(response, request, options);

        return response;
      }
    ]
  }
});

export const pcomparatorAuthenticatedApiClient = pcomparatorApiClient.extend({
  hooks: {
    beforeRequest: [
      async (request: Request) => {
        request.headers.set("cookie", (await headers()).get("cookie")!);

        return request;
      }
    ],
    beforeError: [
      async (error) => {
        const errorBody = await error.response.json<HTTPError>();

        return new HTTPError(errorBody.message, errorBody.status, errorBody.cause) as any;
      }
    ]
  }
});
