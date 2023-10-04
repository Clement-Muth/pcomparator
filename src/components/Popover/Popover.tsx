"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { ReactNode } from "react";
import Leaflet from "~/components/Leaflet/Leaflet";
import useWindowDimension from "~/hooks/useWindowDimension";

interface PopoverProps {
  children: ReactNode;
  content: ReactNode | string;
  align?: "center" | "start" | "end";
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const Popover = ({ children, content, align = "center", open, onOpenChange }: PopoverProps) => {
  const { isMobile, isDesktop } = useWindowDimension();

  if (!isMobile && !isDesktop) return <>{children}</>;

  return (
    <>
      {isMobile && children}
      {open && isMobile && <Leaflet onOpenChange={onOpenChange}>{content}</Leaflet>}
      {isDesktop && (
        <PopoverPrimitive.Root open={open} onOpenChange={(open) => onOpenChange(open)}>
          <PopoverPrimitive.Trigger className="inline-flex" asChild>
            {children}
          </PopoverPrimitive.Trigger>
          <PopoverPrimitive.Content
            sideOffset={4}
            align={align}
            className="z-20 animate-slide-up-fade items-center rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-black drop-shadow-lg"
          >
            {content}
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Root>
      )}
    </>
  );
};

export default Popover;
