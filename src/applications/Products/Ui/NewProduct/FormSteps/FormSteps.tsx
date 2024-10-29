import type { Product } from "~/applications/Products/Domain/Entities/Product";
import { TypeBarcode } from "~/applications/Products/Ui/NewProduct/FormSteps/Step1/TypeBarcode";
import { Price } from "~/applications/Products/Ui/NewProduct/FormSteps/Step2/Price";

interface FormStepsProps {
  step: number;
  onNextStep: (data: any) => void;
  onLastStep: (data: any) => void;
  onCheckBarcode: (barcode: string) => Promise<Product>;
  onPrevious: () => void;
}

export const FormSteps = ({ step, onNextStep, onPrevious, onLastStep, onCheckBarcode }: FormStepsProps) => {
  switch (step) {
    case 1:
      return <TypeBarcode onNextStep={onNextStep} onCheckBarcode={onCheckBarcode} />;
    case 2:
      return <Price onNextStep={onLastStep} onPrevious={onPrevious} />;
  }
};
