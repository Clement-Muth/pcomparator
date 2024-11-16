import { Modal, ModalContent, ModalHeader } from "@nextui-org/react";
import { useState } from "react";
import { Location } from "~/applications/Prices/Ui/NewPrice/FormSteps/Step4/Location";
import { Price } from "~/applications/Prices/Ui/NewQuickPrice/FormSteps/Price";
import { Stepper } from "~/components/Stepper/Stepper";

interface NewQuickPriceProps {
  isOpen: boolean;
  onOpenChange: () => void;
  productName: string;
}

export const NewQuickPrice = ({ isOpen, onOpenChange, productName }: NewQuickPriceProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<{ price: number; location: string; storeName: string } | null>(
    null
  );

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="mt-4">
          <Stepper steps={[{ label: "Price" }, { label: "Location" }]} currentStep={step} />
        </ModalHeader>
        {step === 1 ? (
          <Price
            onNextStep={(price) => {
              setFormData((formData) => ({ ...(formData as any), ...price }));
              setStep(2);
            }}
            productName={productName}
          />
        ) : (
          <Location
            onPrevious={() => setStep(1)}
            onNextStep={async (data) => {
              const finalData = { ...formData, ...data };
            }}
          />
        )}
      </ModalContent>
    </Modal>
  );
};
