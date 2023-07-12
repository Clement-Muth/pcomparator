import clsx from "clsx";
import { ReactNode } from "react";

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  className?: string | undefined;
  disabled?: boolean;
  kind?: "primary" | "secondary";
  type?: "button" | "submit" | "reset" | undefined;
}

const Button = ({ onClick, kind, disabled, children, className, type = "button" }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        kind === "primary"
          ? `flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none ${
              disabled
                ? "cursor-not-allowed border-gray-200 bg-gray-100"
                : "border border-gray-200 bg-white text-black hover:bg-gray-50"
            }`
          : "rounded-full text-white bg-black px-5 py-2",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
