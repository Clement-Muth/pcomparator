"use client";

import { useRouter } from "next/navigation";
import Button from "~/components/Button/Button";

// rome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
export default function Error() {
  const { push } = useRouter();

  return (
    <div className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600 dark:text-indigo-300">500</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Server error
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-300">
          Sorry, an internal server error occurred.
        </p>
        <Button className="mt-10 flex items-center justify-center gap-x-6" onClick={() => push("/")}>
          Go back home
        </Button>
      </div>
    </div>
  );
}
