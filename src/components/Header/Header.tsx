"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { pcomparatorHomePageRoute } from "~/core/routes";
import useScroll from "~/hooks/useScroll";

interface HeaderProps {
  children?: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  const scrolled = useScroll(50);

  return (
    <header
      className={clsx(
        "fixed top-0 w-full flex justify-between px-4 py-3 z-[33]",
        scrolled ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl" : "bg-white/0"
      )}
    >
      <Link href={pcomparatorHomePageRoute()} className="flex items-center gap-x-2">
        <Image
          src="/static/logo.png"
          alt="price comparator logo"
          width={30}
          height={30}
          style={{ width: "100%", height: "100%" }}
        />
        <p className="text-2xl tracking-tighter font-medium">PComparator</p>
      </Link>
      {children}
    </header>
  );
};

export default Header;
