import clsx from "clsx";
import { ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
  footer?: ReactNode;
}

const Card = ({ children, footer }: CardProps) => {
  return (
    <div
      className={clsx(
        "w-full overflow-hidden shadow-xl",
        "dark:border-gray-600",
        "md:max-w-md md:rounded-2xl md:border md:border-gray-200"
      )}
    >
      <div
        className={clsx(
          "flex flex-col items-center justify-center space-y-3 border-b bg-white px-4 py-6 pt-8 text-center",
          "dark:border-gray-600 dark:bg-black",
          "md:px-16"
        )}
      >
        {children}
      </div>
      <div className={clsx("flex flex-col space-y-4 bg-gray-50 px-4 py-8", "dark:bg-gray-950", "md:px-16")}>
        {footer}
      </div>
    </div>
  );
};

export default Card;
