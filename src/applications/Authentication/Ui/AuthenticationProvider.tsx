"use client";

import { SessionProvider } from "next-auth/react";

export interface AuthenticationProviderProps {
  children: React.ReactNode;
}

const AuthenticationProvider = ({ children }: AuthenticationProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthenticationProvider;
