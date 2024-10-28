import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Modal, ModalContent, ModalHeader } from "@nextui-org/react";
import { Stepper } from "react-form-stepper";
import type { Barcode } from "~/applications/Products/Domain/valueObjects/Barcode";
import { TypeBarcode } from "~/applications/Products/Ui/NewProduct/FormSteps/Step1/TypeBarcode";

interface NewProductModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  barcode: Barcode | undefined;
}

export const NewProductModal = ({ isOpen, onOpenChange, barcode }: NewProductModalProps) => {
  const { i18n } = useLingui();

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
      <ModalContent>
        <ModalHeader>
          <Stepper
            steps={[{ label: t(i18n)`Barcode` }, { label: t(i18n)`Price` }]}
            className="w-full"
            // styleConfig={{ activeBgColor: "#d3d3ff" }}
          />
        </ModalHeader>
        <TypeBarcode />
        {/* <NewProductForm barcode={barcode} /> */}
      </ModalContent>
    </Modal>
  );
};
