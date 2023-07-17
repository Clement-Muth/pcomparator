"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import Leaflet from "~/components/Leaflet/Leaflet";
import useWindowDimension from "~/hooks/useWindowDimension";

export interface TooltipProps {
  children: ReactNode;
  content: ReactNode | string;
  fullWidth?: boolean;
}

const Tooltip = ({ children, content, fullWidth }: TooltipProps) => {
  const [openTooltip, setOpenTooltip] = useState(false);

  const { isMobile, isDesktop } = useWindowDimension();

  return (
    <>
      {isMobile && (
        <button
          type="button"
          className={`${fullWidth ? "w-full" : "inline-flex"}`}
          onClick={() => setOpenTooltip(true)}
        >
          {children}
        </button>
      )}
      {openTooltip &&
        isMobile &&
        createPortal(
          <Leaflet onOpenChange={setOpenTooltip} className="z-[2000] pb-5">
            {typeof content === "string" ? (
              <span className="flex w-full items-center justify-center bg-white px-10 text-center text-sm text-gray-700">
                {content}
              </span>
            ) : (
              content
            )}
          </Leaflet>,
          document.body
        )}
      {isDesktop && (
        <TooltipPrimitive.Provider delayDuration={100}>
          <TooltipPrimitive.Root>
            <TooltipPrimitive.Trigger className="hidden sm:inline-flex" asChild>
              {children}
            </TooltipPrimitive.Trigger>
            <TooltipPrimitive.Content
              sideOffset={4}
              side="top"
              className="z-30 hidden animate-slide-up-fade items-center overflow-hidden rounded-md border border-gray-200 bg-white drop-shadow-lg sm:block"
            >
              <TooltipPrimitive.Arrow className="fill-current text-white" />
              {typeof content === "string" ? (
                <div className="p-5">
                  <span className="block max-w-xs text-center text-sm text-gray-700">{content}</span>
                </div>
              ) : (
                content
              )}
              <TooltipPrimitive.Arrow className="fill-current text-white" />
            </TooltipPrimitive.Content>
          </TooltipPrimitive.Root>
        </TooltipPrimitive.Provider>
      )}
    </>
  );
};

export default Tooltip;
