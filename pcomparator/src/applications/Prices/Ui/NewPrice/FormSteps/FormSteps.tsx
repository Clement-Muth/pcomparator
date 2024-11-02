import { TypeBarcode } from "~/applications/Prices/Ui/NewPrice/FormSteps/Step1/TypeBarcode";
import { Price } from "~/applications/Prices/Ui/NewPrice/FormSteps/Step2/Price";
import { Location } from "~/applications/Prices/Ui/NewPrice/FormSteps/Step4/Location";

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
      return <Price onNextStep={onNextStep} onPrevious={onPrevious} />;
    case 3:
      return <Location onNextStep={onLastStep} onPrevious={onPrevious} />;
    // case 3:
    //   return <Proof onNextStep={onLastStep} onPrevious={onPrevious} />;
  }
};
