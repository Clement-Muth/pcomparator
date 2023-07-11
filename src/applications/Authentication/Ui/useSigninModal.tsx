"use client";

import { useCallback, useMemo, useState } from "react";
import SignInModal from "~/applications/Authentication/Ui/SigninModal";

const useSignInModal = () => {
  const [showSignInModal, setShowSignInModal] = useState(false);

  const SignInModalCallback = useCallback(() => {
    return <SignInModal showSignInModal={showSignInModal} setShowSignInModal={setShowSignInModal} />;
  }, [showSignInModal]);

  return useMemo(() => ({ setShowSignInModal, SignInModal: SignInModalCallback }), [SignInModalCallback]);
};

export default useSignInModal;
