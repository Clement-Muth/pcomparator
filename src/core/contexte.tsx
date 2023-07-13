"use client";

import { FC, ReactNode, createContext, useCallback, useContext, useMemo, useState } from "react";
import Toast from "~/components/Toast/Toast";
import ThemeProvider from "~/core/ThemeProvider";

export interface State {
  Toast: () => JSX.Element;
  onOpenChange: (open: boolean) => void;
}

export const UIContext = createContext<State>({ Toast: () => <></>, onOpenChange: () => null });

export const UIProvider: FC<{ children: ReactNode }> = (props) => {
  const [open, setOpen] = useState(false);

  const TaostCallback = useCallback(() => {
    return <Toast open={open} onClose={setOpen} />;
  }, [open]);

  const onOpenChange = useCallback((open: boolean) => setOpen(open), []);

  const value = useMemo(
    () => ({
      Toast: TaostCallback,
      onOpenChange
    }),
    [TaostCallback, onOpenChange]
  );

  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
  const context = useContext(UIContext);

  if (context === undefined) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
};

export const ManagedUIContext: FC<{ children: ReactNode }> = ({ children }) => (
  <UIProvider>
    <UIContext.Consumer>
      {({ Toast }) => (
        <ThemeProvider>
          {children}
          <Toast />
        </ThemeProvider>
      )}
    </UIContext.Consumer>
  </UIProvider>
);
