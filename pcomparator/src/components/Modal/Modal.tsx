import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Modal as ModalNextUi,
  type ModalProps as ModalNextUiProps
} from "@nextui-org/react";
import clsx from "clsx";
import { BottomSheet } from "react-spring-bottom-sheet";
import useDevice from "~/hooks/useDevice";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  body: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  onOpenChange?: (isOpen: boolean) => void;
  sheetHeight?: "sm" | "md" | "lg" | "fit" | "full";
  modalProps?: Omit<ModalNextUiProps, "children">;
  isForm?: boolean;
}

export const Modal = ({
  isOpen,
  onClose,
  onOpenChange,
  header,
  body,
  footer,
  modalProps,
  sheetHeight = "fit",
  isForm
}: ModalProps) => {
  const device = useDevice();

  if (device === "mobile") {
    return (
      <BottomSheet
        open={isOpen}
        onDismiss={onClose}
        expandOnContentDrag
        header={header}
        footer={footer}
        snapPoints={({ maxHeight, minHeight }) => {
          switch (sheetHeight) {
            case "sm":
              return maxHeight / 4;
            case "full":
              return maxHeight;
            case "lg":
              return maxHeight / 1.5;
            case "md":
              return maxHeight / 2;
            default:
              return minHeight;
          }
        }}
      >
        <div className="p-4">{body}</div>
      </BottomSheet>
    );
  }

  return (
    <ModalNextUi isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange} {...modalProps}>
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalBody className={clsx(isForm && "!mb-3")}>{body}</ModalBody>
        {!isForm && <ModalFooter>{footer}</ModalFooter>}
      </ModalContent>
    </ModalNextUi>
  );
};
