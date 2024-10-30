import type { Product } from "~/applications/Prices/Domain/Entities/Product";
import { TypeBarcode } from "~/applications/Prices/Ui/NewPrice/FormSteps/Step1/TypeBarcode";
import { Price } from "~/applications/Prices/Ui/NewPrice/FormSteps/Step2/Price";

interface FormStepsProps {
  step: number;
  onNextStep: (data: any) => Promise<void>;
  onLastStep: (data: any) => Promise<void>;
  onCheckBarcode: (barcode: string) => Promise<Product>;
  onPrevious: () => void;
}

export const FormSteps = ({ step, onNextStep, onPrevious, onLastStep, onCheckBarcode }: FormStepsProps) => {
  switch (step) {
    case 1:
      return <TypeBarcode onNextStep={onNextStep} onCheckBarcode={onCheckBarcode} />;
    case 2:
      return <Price onNextStep={onLastStep} onPrevious={onPrevious} />;
    // case 3:
    //   return <Proof onNextStep={onLastStep} onPrevious={onPrevious} />;
  }
};
