import { Trans } from "@lingui/macro";
import { Modal, ModalContent, ModalHeader } from "@nextui-org/react";
import { NewProductForm } from "~/applications/Products/Ui/NewProduct/NewProductForm";

interface NewProductModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const NewProductModal = ({ isOpen, onOpenChange }: NewProductModalProps) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
      <ModalContent>
        <ModalHeader>
          <h3>
            <Trans>Add a new product</Trans>
          </h3>
        </ModalHeader>
        <NewProductForm />
      </ModalContent>
    </Modal>
  );
};
