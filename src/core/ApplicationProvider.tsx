"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { ReactNode } from "react";
import { queryClient } from "~/clients/ReactQuery";
import useQueryDevTool from "~/core/useQueryDevTool";
import { ApplicationEnvironment } from "~/types/extends";

interface ApplicationProviderProps {
  children: ReactNode;
  applicationEnvironment: ApplicationEnvironment;
}

const ApplicationProvider = ({ children, applicationEnvironment }: ApplicationProviderProps) => {
  const showReactQueryDevTool = useQueryDevTool(applicationEnvironment);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {applicationEnvironment === "development" && showReactQueryDevTool ? (
        <ReactQueryDevtools initialIsOpen={false} />
      ) : null}
    </QueryClientProvider>
  );
};

export default ApplicationProvider;
