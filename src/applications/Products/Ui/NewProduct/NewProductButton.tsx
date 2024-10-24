"use client";

import { Trans } from "@lingui/macro";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure
} from "@nextui-org/react";
import { FilePlus, Plus, ScanBarcode } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import type { Barcode } from "~/applications/Products/Domain/Barcode";
const BarcodeScannerModal = dynamic(() =>
  import("~/applications/Products/Ui/BarcodeScanner/BarcodeScannerModal").then(
    (mod) => mod.BarcodeScannerModal
  )
);
const NewProductModal = dynamic(() =>
  import("~/applications/Products/Ui/NewProduct/NewProductModal").then((mod) => mod.NewProductModal)
);

export const NewProductButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modal, setModal] = useState<"with" | "without" | undefined>(undefined);
  const [barcode, setBarcode] = useState<Barcode | undefined>(undefined);

  return (
    <>
      <Dropdown placement="bottom">
        <DropdownTrigger>
          <Button startContent={<Plus />} variant="light" radius="full" onPress={onOpen} isIconOnly />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem
            key="settings"
            textValue="with barcode"
            startContent={<ScanBarcode />}
            onPress={() => {
              setModal("with");
              onOpen();
            }}
          >
            <Trans>With barcode</Trans>
          </DropdownItem>
          <DropdownItem
            key="logout"
            textValue="without barcode"
            startContent={<FilePlus />}
            onPress={() => {
              setModal("without");
              onOpen();
            }}
          >
            <Trans>Without barcode</Trans>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {modal === "with" ? (
        <BarcodeScannerModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onBarcodeDetected={(detectedBarcode) => {
            console.log(detectedBarcode);
            if (!barcode) {
              setBarcode(detectedBarcode);
              setModal("without");
            }
          }}
        />
      ) : null}
      {modal === "without" ? (
        <NewProductModal isOpen={isOpen} onOpenChange={onOpenChange} barcode={barcode} />
      ) : null}
    </>
  );
};
