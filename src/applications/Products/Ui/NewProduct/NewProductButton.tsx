"use client";

import { Trans, t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure
} from "@nextui-org/react";
import { Plus, ScanBarcode, Type } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { toast } from "react-toastify";
import type { Barcode } from "~/applications/Products/Domain/ValueObjects/Barcode";
const BarcodeScannerModal = dynamic(() =>
  import("~/applications/Products/Ui/NewProduct/BarcodeScanner/BarcodeScannerModal").then(
    (mod) => mod.BarcodeScannerModal
  )
);
const NewProductModal = dynamic(() =>
  import("~/applications/Products/Ui/NewProduct/NewProductModal").then((mod) => mod.NewProductModal)
);

export const NewProductButton = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { i18n } = useLingui();
  const [modal, setModal] = useState<"with" | "without" | undefined>(undefined);
  const [barcode, setBarcode] = useState<Barcode | undefined>(undefined);
  const notify = (productName: string) =>
    toast(<Trans>Product {productName} added!</Trans>, {
      type: "success"
    });

  return (
    <>
      <Dropdown placement="bottom">
        <DropdownTrigger>
          <Button startContent={<Plus />} variant="light" radius="full" onPress={onOpen} isIconOnly />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem
            key="settings"
            textValue="Scan barcode"
            startContent={<ScanBarcode />}
            onPress={() => {
              setModal("with");
              onOpen();
            }}
            description={t(i18n)`Add new product by scanning barcode`}
            shortcut="⌘C"
          >
            <Trans>Scan barcode</Trans>
          </DropdownItem>
          <DropdownItem
            key="logout"
            textValue="Type barcode"
            startContent={<Type />}
            onPress={() => {
              setModal("without");
              onOpen();
            }}
            description={t(i18n)`Add new product by typing barcode`}
            shortcut="⌘N"
          >
            <Trans>Type barcode</Trans>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {modal === "with" ? (
        <BarcodeScannerModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onBarcodeDetected={(detectedBarcode) => {
            if (!barcode) {
              setBarcode(detectedBarcode);
              setModal("without");
            }
          }}
        />
      ) : null}
      {modal === "without" ? (
        <NewProductModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onSuccessfull={(productName) => {
            notify(productName);
            onClose();
          }}
          barcode={barcode}
        />
      ) : null}
    </>
  );
};
