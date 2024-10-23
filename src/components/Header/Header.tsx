"use client";

import { Image, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import type { ReactNode } from "react";
import Link from "~/components/Link/Link";
import Logo from "../../../public/static/logo.png";

interface HeaderProps {
  rightArea: ReactNode;
}

export const Header = ({ rightArea }: HeaderProps) => {
  return (
    <Navbar position="static" classNames={{ base: "bg-transparent" }}>
      <NavbarBrand>
        <Link href="/">
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
