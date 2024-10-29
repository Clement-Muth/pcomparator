import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Modal, ModalContent, ModalHeader } from "@nextui-org/react";
import { useState } from "react";
import { createPrice } from "~/applications/Products/Api/createPrice";
import { getProduct } from "~/applications/Products/Api/getProduct";
import type { Barcode } from "~/applications/Products/Domain/valueObjects/Barcode";
import { FormSteps } from "~/applications/Products/Ui/NewProduct/FormSteps/FormSteps";
import { Stepper } from "~/components/Stepper/Stepper";

interface NewProductModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  barcode: Barcode | undefined;
}

export const NewProductModal = ({ isOpen, onOpenChange, barcode }: NewProductModalProps) => {
  const { i18n } = useLingui();
  const [step, setStep] = useState<number>(1);
  const [productData, setProductData] = useState({});

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
        <ModalContent>
          <ModalHeader className="mt-4">
            <Stepper steps={[{ label: t(i18n)`Barcode` }, { label: t(i18n)`Price` }]} currentStep={step} />
          </ModalHeader>
          <FormSteps
            step={step}
            onNextStep={(data) => {
              setProductData((product) => ({ ...product, ...data }));
              setStep((currentStep) => currentStep + 1);
            }}
            onLastStep={async (data) => {
              const byteCharacters = data.proof;
              const byteNumbers = new Array(byteCharacters.length);
              for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
              }
              const byteArray = new Uint8Array(byteNumbers);
              const blob = new Blob([byteArray], { type: "" });

              await createPrice({ barcode: (productData as { barcode: string }).barcode, proof: blob });
            }}
            onPrevious={() => setStep((currentStep) => currentStep - 1)}
            onCheckBarcode={(barcode) => getProduct({ barcode: { barcode: barcode, format: "test" } })}
          />
        </ModalContent>
      </Modal>
    </>
  );
};
