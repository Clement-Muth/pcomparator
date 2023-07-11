import clsx from "clsx";
import { ReactNode } from "react";

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

const Button = ({ onClick, children, className }: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx("rounded-full text-white bg-black px-5 py-2", className)}
    >
      {children}
    </button>
  );
};

export default Button;
