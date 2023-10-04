import clsx from "clsx";
import { LegacyRef, forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import Label from "~/components/Input/Label";

interface InputProps extends UseFormRegisterReturn {
  placeholder?: string;
  label?: string;
  error?: string;
  errorWithoutMessage?: boolean;
  inputMode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search" | undefined;
  breakError?: boolean;
}

const Input = forwardRef(
  (
    { placeholder, label, error, inputMode, errorWithoutMessage, breakError, ...register }: InputProps,
    ref: LegacyRef<HTMLInputElement>
  ) => {
    return (
      <div className="flex flex-col w-full items-start">
        {label || error ? (
          <Label error={error} label={label} name={register.name} breakError={breakError} />
        ) : null}
        <div
          className={clsx(
            "rounded-md border text-sm shadow-sm bg-white dark:bg-black text-black dark:text-white hover:bg-gray-50 w-full",
            error || errorWithoutMessage ? "border-red9" : "border-gray-200 dark:border-gray-800"
          )}
        >
          <input
            id={register.name}
            aria-invalid
            className="rounded-md h-[36px] px-4 w-full dark:bg-black dark:placeholder:text-gray-400"
            placeholder={placeholder}
            inputMode={inputMode}
            {...register}
            ref={ref}
          />
        </div>
      </div>
    );
  }
);

export default Input;
