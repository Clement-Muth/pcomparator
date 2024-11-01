"use client";

import { Image, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import type { ReactNode } from "react";
import Link from "pcomparator/src/components/Link/Link";
import useScroll from "pcomparator/src/hooks/useScroll";
import Logo from "../../../public/static/logo.png";

interface HeaderProps {
  rightArea: ReactNode;
}

export const Header = ({ rightArea }: HeaderProps) => {
  const hasScrolled = useScroll(50);

  return (
    <Navbar position="sticky" classNames={{ base: "bg-transparent" }} isBlurred={hasScrolled}>
      <NavbarBrand>
        <Link href="/" className="flex-[0_0_auto]">
          <Image src={Logo.src} fallbackSrc={Logo.blurDataURL} width={35} height={35} />
          <p className="text-xl text-inherit ml-2">PComparator</p>
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end">
        {/* <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem> */}
        {rightArea}
      </NavbarContent>
    </Navbar>
  );
};
