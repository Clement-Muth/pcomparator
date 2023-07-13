import ky, { HTTPError, NormalizedOptions } from "ky";

const pcomparatorApiEndpoint = process.env.PCOMPARATOR_API_ENDPOINT;
if (!pcomparatorApiEndpoint) {
  throw new Error("The environment variable 'PCOMPARATOR_API_ENDPOINT' is missing");
}

export const pcomparatorApiClient = ky.create({
  // We delegate to react-query the retry logic
  retry: 0,

  hooks: {
    beforeRequest: [],

    beforeError: [],

    afterResponse: [
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
