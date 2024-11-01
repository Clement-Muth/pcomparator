import { TypeBarcode } from "pcomparator/src/applications/Prices/Ui/NewPrice/FormSteps/Step1/TypeBarcode";
import { Price } from "pcomparator/src/applications/Prices/Ui/NewPrice/FormSteps/Step2/Price";

interface FormStepsProps {
  step: number;
  onNextStep: (data: any) => Promise<void>;
  onLastStep: (data: any) => Promise<void>;
  // onCheckBarcode: (barcode: string) => Promise<Product>;
  onPrevious: () => void;
}

export const FormSteps = ({ step, onNextStep, onPrevious, onLastStep }: FormStepsProps) => {
  switch (step) {
    case 1:
      return <TypeBarcode onNextStep={onNextStep} />;
    case 2:
      return <Price onNextStep={onLastStep} onPrevious={onPrevious} />;
    // case 3:
    //   return <Proof onNextStep={onLastStep} onPrevious={onPrevious} />;
  }
};
