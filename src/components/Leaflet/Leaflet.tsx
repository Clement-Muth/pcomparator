"use client";

import clsx from "clsx";
import { AnimatePresence, PanInfo, motion, useAnimation } from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";

interface LeafletProps {
  onOpenChange: (open: boolean) => void;
  className?: string;
  children: ReactNode;
}

const Leaflet = ({ onOpenChange, className, children }: LeafletProps) => {
  const leafletRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const transitionProps = { type: "spring", stiffness: 500, damping: 30 };

  useEffect(() => {
    controls.start({
      y: 20,
      transition: transitionProps
    });
  }, [controls]);

  async function handleDragEnd(_: unknown, info: PanInfo) {
    const offset = info.offset.y;
    const velocity = info.velocity.y;
    const height = leafletRef.current?.getBoundingClientRect().height || 0;
    if (offset > height / 2 || velocity > 800) {
      await controls.start({ y: "100%", transition: transitionProps });
      onOpenChange(false);
    } else {
      controls.start({ y: 0, transition: transitionProps });
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        ref={leafletRef}
        key="leaflet"
        className={clsx(
          "flex flex-col",
          "group fixed inset-x-0 bottom-0 z-40 w-screen cursor-grab bg-white active:cursor-grabbing sm:hidden max-h-full",
          className
        )}
        initial={{ y: "100%" }}
        animate={controls}
        exit={{ y: "100%" }}
        transition={transitionProps}
        drag="y"
        dragDirectionLock
        onDragEnd={handleDragEnd}
        dragElastic={{ top: 0, bottom: 1 }}
        dragConstraints={{ top: 0, bottom: 0 }}
      >
        <div
          className={clsx(
            "rounded-t-4xl flex h-[17px] w-full items-center justify-center border-t border-gray-200"
          )}
          style={{ flex: "0 0 auto" }}
        >
          <div className="-mr-1 h-1 w-6 rounded-full bg-gray-300 transition-all group-active:rotate-12" />
          <div className="h-1 w-6 rounded-full bg-gray-300 transition-all group-active:-rotate-12" />
        </div>
        <div className="grow">
          <div>{children}</div>
        </div>
      </motion.div>
      <motion.div
        key="leaflet-backdrop"
        className="fixed inset-0 z-30 bg-gray-100 bg-opacity-10 backdrop-blur"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => onOpenChange(false)}
      />
    </AnimatePresence>
  );
};

export default Leaflet;
