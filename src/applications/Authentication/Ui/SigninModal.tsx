"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Google from "~/components/Icons/Google/Google";
import LoadingDots from "~/components/Loader/LoadingDot";
import { pcomparatorHomepageRoute } from "~/core/routes";

const SignInModal = () => {
  const [signInClicked, setSignInClicked] = useState(false);

  return (
    <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
      <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
        <Link href={pcomparatorHomepageRoute()}>
          <Image
            src="/static/logo.png"
            alt="Logo"
            className="h-10 w-10 rounded-full"
            width={20}
            height={20}
          />
        </Link>
        <h3 className="font-display text-2xl font-bold">Sign In</h3>
        <p className="text-sm text-gray-500">Sign in to enjoy all features of PComparator</p>
      </div>

      <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 md:px-16">
        <button
          type="button"
          disabled={signInClicked}
          className={`${
            signInClicked
              ? "cursor-not-allowed border-gray-200 bg-gray-100"
              : "border border-gray-200 bg-white text-black hover:bg-gray-50"
          } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
          onClick={() => {
            setSignInClicked(true);
            signIn("google");
          }}
        >
          {signInClicked ? (
            <LoadingDots color="#808080" />
          ) : (
            <>
              <Google className="h-5 w-5" />
              <p>Sign In with Google</p>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SignInModal;
