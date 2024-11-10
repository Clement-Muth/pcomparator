"use client";

import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useDisclosure } from "@nextui-org/react";
import clsx from "clsx";
import { Send } from "lucide-react";
import { type ReactNode, useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { search } from "~/applications/Searchbar/Api/search";
import { SearchResultModal } from "~/applications/Searchbar/Ui/SearchResult/SearchResultModal";

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
        <SearchResultModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          prices={state.prices as any}
          search={state.search}
        />
      )}
    </form>
  );
};
