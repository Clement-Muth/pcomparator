"use client";

import { Trans, t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import {
  Button,
  Card,
  CardBody,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from "@nextui-org/react";
import clsx from "clsx";
import { Send } from "lucide-react";
import { type ReactNode, useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import {} from "react-hook-form";
import { getCurrencySymbol } from "~/applications/Prices/Domain/ValueObjects/Currency";
import { search } from "~/applications/Searchbar/Api/search";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <div className="absolute top-1 right-1.5">
      <button
        type="submit"
        color="primary"
        className="bg-primary rounded-full p-2"
        disabled={pending}
        aria-disabled={pending}
        aria-valuetext="Search button"
      >
        <Send />
      </button>
    </div>
  );
};

interface SearchbarProps {
  startContent: ReactNode;
}

export const Searchbar = ({ startContent }: SearchbarProps) => {
  const [state, formAction] = useActionState(search, null);
  const { i18n } = useLingui();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (state?.success) onOpen();
  }, [state]);

  return (
    <form action={formAction} className="w-full">
      <div className="relative w-full">
        <label>
          <input
            name="search"
            className={clsx("rounded-full bg-default-100 border-none shadow-sm w-full h-12 pl-12 pr-16")}
            placeholder={t(i18n)`Enter your product name`}
          />
          {!state?.success && state?.errors.fieldErrors.search ? (
            <p aria-live="polite" className="text-danger">
              {state?.errors.fieldErrors.search}
            </p>
          ) : null}
        </label>
        <div className="absolute top-1 left-1.5">{startContent}</div>
        <SubmitButton />
      </div>

      {state?.success && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            <ModalHeader>
              <p>
                <Trans>Prices for {state.search}</Trans>
              </p>
            </ModalHeader>
            <ModalBody>
              {state.prices?.map((price, i) => (
                <Card key={price.product.name + i}>
                  <CardBody className="flex !flex-row gap-4">
                    <Image src={price.priceProofImage} width={100} height={100} className="object-cover" />
                    <div className="flex flex-col justify-between">
                      <div>
                        <p className="font-bold text-lg">{price.product.name}</p>
                        <p className="text-small">{price.store.name} – 6km</p>
                      </div>
                      <p>
                        {getCurrencySymbol(price.currency)} {price.amount}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </ModalBody>
            <ModalFooter>
              <Button size="sm">
                <Trans>Close</Trans>
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </form>
  );
};
