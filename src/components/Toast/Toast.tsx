"use client";

import { Bounce, ToastContainer } from "react-toastify";
import { useTheme } from "~/hooks/useTheme";

export const Toast = () => {
  const { activeTheme } = useTheme();

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={activeTheme}
      transition={Bounce}
      stacked
    />
  );
};
