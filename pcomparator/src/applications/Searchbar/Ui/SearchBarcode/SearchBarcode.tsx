"use client";

import { Button, useDisclosure } from "@nextui-org/react";
import { ScanBarcode } from "lucide-react";
import { useState } from "react";
import type { Price } from "~/applications/Prices/Domain/Entities/Price";
import type { Product } from "~/applications/Prices/Domain/Entities/Product";
import type { Store } from "~/applications/Prices/Domain/Entities/Store";
import { search } from "~/applications/Searchbar/Api/search";
import { searchByBarcode } from "~/applications/Searchbar/Api/searchByBarcode";
import { BarcodeScannerModal } from "~/applications/Searchbar/Ui/SearchBarcode/BarcodeScannerModal";
import { SearchResultModal } from "~/applications/Searchbar/Ui/SearchResult/SearchResultModal";

export const SearchBarcode = () => {
  const { onOpen, onClose, isOpen, onOpenChange } = useDisclosure();
  const [prices, setPrices] = useState<(Price & { product: Product; store: Store })[] | null>(null);

  return (
    <>
      <BarcodeScannerModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onBarcodeDetected={async (barcode) => {
          const { name } = await searchByBarcode({ barcode: barcode.barcode });
          const formData = new FormData();

          formData.append("search", name);
          setPrices((await search(null, formData)).prices!);
          onClose();
        }}
      />
      <Button
        startContent={<ScanBarcode />}
        onPress={onOpen}
        radius="full"
        variant="faded"
        className="p-7 w-18 h-18 -mt-8 border-none shadow-medium"
        isIconOnly
      />
      {prices && <SearchResultModal isOpen={true} onOpenChange={() => null} prices={prices} search="" />}
    </>
  );
};
