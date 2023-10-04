"use client";

import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from "react";
import Modal from "~/components/Modal/Modal";
import Toast from "~/components/Toast/Toast";
import ThemeProvider from "~/core/ThemeProvider";

export interface State {
  toast: { Toast: () => JSX.Element; onOpenChange: (open: boolean) => void };
  modal: {
    Modal: () => JSX.Element;
    onOpenChange: (open: boolean) => void;
    setModalChildren: Dispatch<SetStateAction<ReactNode>>;
  };
}

export const UIContext = createContext<State>({
  toast: { Toast: () => <></>, onOpenChange: () => null },
  modal: { Modal: () => <></>, onOpenChange: () => null, setModalChildren: () => <></> }
});

export const UIProvider: FC<{ children: ReactNode }> = (props) => {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalChildren, setModalChildren] = useState<ReactNode>();

  const TaostCallback = useCallback(() => {
    return <Toast open={open} onClose={setOpen} />;
  }, [open]);

  const ModalCallback = useCallback(() => {
    return (
      <Modal showModal={showModal} setShowModal={setShowModal}>
        {modalChildren}
      </Modal>
    );
  }, [showModal, modalChildren]);

  const onOpenChangeToast = useCallback((open: boolean) => setOpen(open), []);
  const onOpenChangeModal = useCallback((open: boolean) => setShowModal(open), []);

  const value = useMemo(
    (): State => ({
      toast: { Toast: TaostCallback, onOpenChange: onOpenChangeToast },
      modal: {
        Modal: ModalCallback,
        onOpenChange: onOpenChangeModal,
        setModalChildren
      }
    }),
    [TaostCallback, onOpenChangeToast, ModalCallback, onOpenChangeModal]
  );

  return <UIContext.Provider value={value} {...props} />;
};

export const useCoreUI = () => {
  const context = useContext(UIContext);

  if (context === undefined) {
    throw new Error("useCoreUI must be used within a UIProvider");
  }
  return context;
};

export const ManagedUIContext: FC<{ children: ReactNode }> = ({ children }) => (
  <UIProvider>
    <UIContext.Consumer>
      {({ toast, modal }) => (
        <ThemeProvider>
          {children}
          <toast.Toast />
          <modal.Modal />
        </ThemeProvider>
      )}
    </UIContext.Consumer>
  </UIProvider>
);
