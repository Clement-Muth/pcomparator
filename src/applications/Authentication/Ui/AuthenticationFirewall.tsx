"use client";

import { SessionProvider } from "next-auth/react";

export interface AuthenticationFirewallProps {
  children: React.ReactNode;
}

const AuthenticationFirewall = ({ children }: AuthenticationFirewallProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthenticationFirewall;
