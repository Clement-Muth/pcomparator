import { Modal, ModalContent } from "@nextui-org/react";
import { BarcodeScanner } from "react-barcode-scanner";
import type { Barcode } from "~/applications/Products/Domain/valueObjects/Barcode";

interface BarcodeScannerModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onBarcodeDetected: (barcode: Barcode) => void;
}

export const BarcodeScannerModal = ({
  isOpen,
  onOpenChange,
  onBarcodeDetected
}: BarcodeScannerModalProps) => (
  <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
    <ModalContent>
      <BarcodeScanner
        onCapture={(barcode) => onBarcodeDetected({ barcode: barcode.rawValue, format: barcode.format })}
        options={{
          formats: [
            "codabar",
            "upc_a",
            "code_128",
            "code_39",
            "code_93",
            "data_matrix",
            "ean_13",
            "ean_8",
            "itf",
            "pdf417",
            "qr_code",
            "upc_e"
          ]
        }}
      />
    </ModalContent>
  </Modal>
);
