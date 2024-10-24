import { Modal, ModalContent } from "@nextui-org/react";
import { BarcodeScanner } from "react-barcode-scanner";

interface BarcodeScannerModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const BarcodeScannerModal = ({ isOpen, onOpenChange }: BarcodeScannerModalProps) => (
  <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
    <ModalContent>
      <BarcodeScanner
        onCapture={(barcode) => console.log(barcode)}
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
