"use client";

import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Button } from "@nextui-org/react";
import { ScanBarcode, Send } from "lucide-react";
import { BarcodeScanner } from "react-barcode-scanner";
import useForm from "~/components/Form/useForm";
import { Input } from "~/components/Inputs/Input/Input";
import "react-barcode-scanner/polyfill";
import { useState } from "react";

export const Searchbar = () => {
  const [showScanner, setShowScanner] = useState(false);
  const form = useForm<{ search: string }>("search");
  const { i18n } = useLingui();

  return (
    <form.Form
      methods={form.methods}
      onSubmit={(data) => console.log(data)}
      disableActions
      className="w-full mt-8"
    >
      <Input
        type="search"
        name="search"
        radius="full"
        size="lg"
        placeholder={t(i18n)`Enter your codebar`}
        classNames={{ inputWrapper: "px-2" }}
        pattern={{
          value: /^(?:\d{12}|\d{13}|[A-Z0-9\-\. \$\/\+%]{1,43}|[\x20-\x7E]{1,48})$/,
          message: t(i18n)`Please enter a valid barcode.`
        }}
        startContent={
          <Button
            startContent={<ScanBarcode />}
            variant="light"
            radius="full"
            onPress={() => setShowScanner(true)}
            isIconOnly
          />
        }
        endContent={
          <Button
            startContent={<Send />}
            type="submit"
            color="primary"
            radius="full"
            isDisabled={!form.watch("search")?.length}
            isIconOnly
          />
        }
      />
      {showScanner ? (
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
      ) : null}
    </form.Form>
  );
};
