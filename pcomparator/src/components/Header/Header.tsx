"use client";

import { Image, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import type { ReactNode } from "react";
import Link from "~/components/Link/Link";
import useDevice from "~/hooks/useDevice";
import useScroll from "~/hooks/useScroll";
import Logo from "../../../public/static/logo.png";

interface HeaderProps {
  rightArea: ReactNode;
}

export const Header = ({ rightArea }: HeaderProps) => {
  const hasScrolled = useScroll(50);
  const device = useDevice();

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
        {device === "desktop" ? rightArea : null}
      </NavbarContent>
    </Navbar>
  );
};
