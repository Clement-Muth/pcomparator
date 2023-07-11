"use client";

import { useSignInModal } from "~/applications/Authentication/Ui/useSigninModal";

const SigninButtonBase = () => {
  const { SignInModal, setShowSignInModal } = useSignInModal();

  return (
    <>
      <button
        type="button"
        onClick={() => setShowSignInModal(true)}
        className="rounded-full text-white bg-black px-5 py-2"
      >
        Sign in
      </button>
      <SignInModal />
    </>
  );
};

export default SigninButtonBase;
