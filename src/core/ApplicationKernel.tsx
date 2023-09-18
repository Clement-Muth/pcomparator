import { ReactNode, Suspense } from "react";
import { Provider as ReactWrapBalancerProvider } from "react-wrap-balancer";
import SigninButton from "~/applications/Authentication/Ui/SigninButton";
import Header from "~/components/Header/Header";
import ApplicationProvider from "~/core/ApplicationProvider";
import { ManagedUIContext } from "~/core/contexte";

interface ApplicationKernelProps {
  children: ReactNode;
}

const ApplicationKernel = (props: ApplicationKernelProps) => {
  return (
    <ApplicationProvider applicationEnvironment="development">
      <ManagedUIContext>
        <ReactWrapBalancerProvider>
          <div className="fixed h-screen w-full bg-gradient-to-br dark:from-[#1f121b] dark:via-[#0c1820] dark:via-80% dark:to-[#081917] from-indigo-50 via-white to-cyan-100" />
          <Suspense fallback="...">
            <Header>
              <SigninButton />
            </Header>
          </Suspense>
          <main className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-32">
            {props.children}
          </main>
        </ReactWrapBalancerProvider>
      </ManagedUIContext>
    </ApplicationProvider>
  );
};

export default ApplicationKernel;
