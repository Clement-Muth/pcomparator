"use client";

import { usePwa } from "@dotmind/react-use-pwa";
import { Button } from "@nextui-org/react";
import { useCallback } from "react";

export const InstallPWA = () => {
  const { installPrompt, isInstalled, isStandalone, isOffline, canInstall } = usePwa();

  const handleInstallPrompt = useCallback(() => {
    if (canInstall) {
      installPrompt();
    }
  }, [canInstall, installPrompt]);

  if (isOffline) {
    return <p>Please check your network 📶</p>;
  }

  if (!isInstalled || !isStandalone) {
    return (
      <Button onClick={handleInstallPrompt}>
        <span>Hey install our app 👋</span>
      </Button>
    );
  }

  return <h1>Welcome to our new app 🚀</h1>;
};
