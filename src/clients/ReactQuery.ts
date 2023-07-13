import { QueryClient } from "@tanstack/react-query";
// import { retryBasedOnException } from "../core/api/retry";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // retry: retryBasedOnException({ nbRetry: 10 }),
    },
    mutations: {
      useErrorBoundary: true // Force react-query to throw error instead of returning it
    }
  }
});
