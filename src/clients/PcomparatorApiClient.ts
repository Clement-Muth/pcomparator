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

    beforeError: [
      (error) => {
        // sentryAddBreadcrumb({
        //   type: "http",
        //   category: "network",
        //   data: {
        //     // Request
        //     method: error.request.method,
        //     url: error.request.url,
        //     headers: Object.fromEntries(error.request.headers.entries()),
        //     body: error.request.body,

        //     // Response
        //     status_code: error.response.status,
        //     reason: error.response.statusText,
        //     apiGwRequestId: error.response.headers.get("apigw-requestid")
        //   },
        //   level: "error"
        // });

        return error;
      }
    ],

    afterResponse: [
      (request: Request, options: NormalizedOptions, response: Response) => {
        // sentryAddBreadcrumb({
        //   type: "http",
        //   category: "network",
        //   data: {
        //     // Request
        //     method: request.method,
        //     url: request.url,
        //     headers: Object.fromEntries(request.headers.entries()),
        //     body: request.body,

        //     // Response
        //     status_code: response.status,
        //     reason: response.statusText,
        //     apiGwRequestId: response.headers.get("apigw-requestid")
        //   },
        //   level: "info"
        // });

        return response;
      },

      (request: Request, options: NormalizedOptions, response: Response) => {
        // Transform 202 into error to allow retry at higher level
        if (response.status === 202) {
          throw new HTTPError(response, request, options);
        }

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
