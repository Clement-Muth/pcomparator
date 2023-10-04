import clsx from "clsx";
import { ReactNode } from "react";

export interface BadgeProps {
  children: ReactNode;
  variant: "green" | "orange" | "blue";
}

const Badge = ({ children, variant }: BadgeProps) => {
  return (
    <div
      className={clsx(
        {
          "bg-orange-100": variant === "orange",
          "bg-green-100": variant === "green",
          "bg-blue-100": variant === "blue"
        },
        "px-3 rounded-md"
      )}
    >
      <span
        className={clsx({
          "text-orange-800": variant === "orange",
          "text-green-800": variant === "green",
          "text-blue-800": variant === "blue"
        })}
      >
        {children}
      </span>
    </div>
  );
};

export default Badge;
