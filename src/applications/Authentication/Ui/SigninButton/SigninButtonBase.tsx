"use client";

import { useLayoutEffect } from "react";
import SignInModal from "~/applications/Authentication/Ui/SigninModal";
import { useCoreUI } from "~/core/contexte";

const SigninButtonBase = () => {
  const { modal } = useCoreUI();

  // rome-ignore lint/nursery/useExhaustiveDependencies: no dependency needed
  useLayoutEffect(() => {
    modal.setModalChildren(<SignInModal />);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => modal.onOpenChange(true)}
        className="rounded-full text-white bg-black px-5 py-2"
      >
        Sign in
      </button>
    </>
  );
};

export default SigninButtonBase;
