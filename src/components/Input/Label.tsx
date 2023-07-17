"use client";

import clsx from "clsx";
import { Info, XCircle } from "lucide-react";
import { isModifier } from "typescript";
import ErrorMessage from "~/components/Input/Error";
import Tooltip from "~/components/Tooltip/Tooltip";
import useWindowDimension from "~/hooks/useWindowDimension";

interface LabelProps {
  label?: string;
  error?: string;
  name?: string;
  breakError?: boolean;
}

const Label = ({ label, error, name, breakError }: LabelProps) => {
  const { isMobile } = useWindowDimension();

  return (
    <div
      className={clsx(
        "flex mb-2 w-full",
        "flex-row justify-between",
        breakError ? "md:flex-col items-start" : "flex items-center space-x-1"
      )}
    >
      {label ? (
        <label
          htmlFor={name}
          className={clsx("text-sm text-left whitespace-nowrap", error ? "text-red9" : "text-black")}
        >
          {label}
        </label>
      ) : null}
      {error ? (
        isMobile ? (
          <Tooltip
            content={
              <div className="flex space-x-2 justify-center bg-red-200 border rounded-md m-4 p-4 border-red-300">
                <XCircle className="text-red9" />
                <span>{error}</span>
              </div>
            }
          >
            <Info className="text-red9 w-5 h-5" />
          </Tooltip>
        ) : (
          <ErrorMessage error={error} />
        )
      ) : null}
    </div>
  );
};

export default Label;
