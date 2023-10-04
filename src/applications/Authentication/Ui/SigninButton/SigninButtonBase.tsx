"use client";

import { useLayoutEffect } from "react";
import SignInModal from "~/applications/Authentication/Ui/SigninModal";
import { useCoreUI } from "~/core/contexte";

const SigninButtonBase = () => {
  const { modal } = useCoreUI();

  useLayoutEffect(() => {
    modal.setModalChildren(<SignInModal />);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => modal.onOpenChange(true)}
        className="rounded-full text-white bg-black dark:border-gray-600 md:border-gray-200 px-5 py-2"
      >
        Sign in
      </button>
    </>
  );
};

export default SigninButtonBase;
