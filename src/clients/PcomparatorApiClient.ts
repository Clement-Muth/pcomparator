// import { addBreadcrumb as sentryAddBreadcrumb } from "@sentry/nextjs";
import ky, { HTTPError, type NormalizedOptions } from "ky";
import { headers } from "next/headers";

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
        if (response.status === 202) throw new HTTPError(response, request, options);

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
    ]
  }
});
