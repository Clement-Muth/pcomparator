import { RefreshCcw } from "lucide-react";
import Button from "~/components/Button/Button";

export interface OnInvalidPayloadProps {
  onClose: () => void;
}

const OnInvalidPayload = ({ onClose }: OnInvalidPayloadProps) => {
  return (
    <>
      <div className="w-full flex flex-col items-center justify-center space-y-4 px-4 pb-6 md:px-16">
        <h1>An internal error occured</h1>
      </div>
      <div className="flex flex-col w-full border-t bg-gray-50 items-center justify-center space-y-4 py-8 md:px-16">
        <Button kind="primary" onClick={() => onClose()}>
          <RefreshCcw className="h-5 w-5" />
          <span>Retry</span>
        </Button>
      </div>
    </>
  );
};

export default OnInvalidPayload;
