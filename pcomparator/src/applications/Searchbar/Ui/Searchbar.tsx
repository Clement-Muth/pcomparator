"use client";

import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Button, Input } from "@nextui-org/react";
import { Send } from "lucide-react";
import type { ReactNode } from "react";
import useForm from "~/components/Form/useForm";

interface SearchbarProps {
  startContent: ReactNode;
}

export const Searchbar = ({ startContent }: SearchbarProps) => {
  const form = useForm<{ search: string }>("search");
  const { i18n } = useLingui();

  return (
    // <form.Form
    //   methods={form.methods}
    //   onSubmit={(data) => {}}
    //   disableActions
    //   className="w-full mt-8"
    // >
    <Input
      type="search"
      name="search"
      radius="full"
      size="lg"
      placeholder={t(i18n)`Enter your codebar`}
      classNames={{ inputWrapper: "px-2" }}
      // pattern={{
      //   value: /^(?:\d{12}|\d{13}|[A-Z0-9\-\. \$\/\+%]{1,43}|[\x20-\x7E]{1,48})$/,
      //   message: t(i18n)`Please enter a valid barcode.`
      // }}
      startContent={startContent}
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
    // </form.Form>
  );
};
