import { getSession } from "next-auth/react";

export interface AuthenticationFirewallProps {
  children: React.ReactNode;
}

const AccessDenied = ({ children }) => {
  return (
    <>
      <h1>Access Denied</h1>
      <p>
        <a href="/api/auth/signin">You must be signed in to view this page</a>
      </p>
      {children}
    </>
  );
};

const AuthenticationFirewall = ({ children }: AuthenticationFirewallProps) => {
  return children;
};

export default AuthenticationFirewall;
