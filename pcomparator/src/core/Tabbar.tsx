"use client";

import { Trans } from "@lingui/macro";
import { useDisclosure } from "@nextui-org/react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { toast } from "react-toastify";
import { NewPriceModal } from "~/applications/Prices/Ui/NewPrice/NewPiceModal";
import { NoPricesFound } from "~/applications/Prices/Ui/NoPricesFound";
const NewProduct = dynamic(() =>
  import("~/applications/Products/Ui/NewProduct/NewProduct").then((mod) => mod.NewProduct)
);
import { SearchBarcode } from "~/applications/Searchbar/Ui/SearchBarcode/SearchBarcode";
import { Tabbar as TabbarComponent } from "~/components/Tabbar/Tabbar";

export const Tabbar = () => {
  const [barcode, setBarcode] = useState<string | null>(null);
  const [newProductDefaultDetails, setNewProductDefaultDetails] = useState<any | null>(null);
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isNewPriceOpen,
    onOpenChange: onOpenChangeNewPrice,
    onOpen: onNewPriceOpen,
    onClose: onNewPriceClose
  } = useDisclosure();
  const notify = () =>
    toast(<Trans>Price added</Trans>, {
      type: "success"
    });

  return (
    <>
      <TabbarComponent
        mainButton={
          <SearchBarcode
            onNewProduct={(barcode, resultBarcode) => {
              setNewProductDefaultDetails(resultBarcode);
              onOpen();
            }}
            onNoPrices={(barcode) => {
              setBarcode(barcode);
              onOpen();
            }}
          />
        }
      />
      {isOpen ? (
        newProductDefaultDetails ? (
          <NewProduct
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            resultBarcode={newProductDefaultDetails}
            onClose={onClose}
          />
        ) : (
          <NoPricesFound
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onCancel={onClose}
            onNewPrice={() => {
              onNewPriceOpen();
              onClose();
            }}
          />
        )
      ) : null}
      <NewPriceModal
        isOpen={isNewPriceOpen}
        barcode={{ barcode: barcode!, format: "" }}
        onOpenChange={onOpenChangeNewPrice}
        onSuccessfull={() => {
          notify();
          onNewPriceClose();
        }}
      />
    </>
  );
};
