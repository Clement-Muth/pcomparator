import { Image, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { SignButton } from "~/applications/Authentication/Ui/Signin/SignButton/SignButton";
import Link from "~/components/Link/Link";
import { ThemeSwitcher } from "~/components/ThemeSwitcher/ThemeSwitcher";
import Logo from "/public/static/logo.png";

export const Header = () => {
  return (
    <Navbar position="static" classNames={{ base: "bg-transparent" }}>
      <NavbarBrand>
        <Link href="/">
          <Image src={Logo.src} fallbackSrc={Logo.blurDataURL} width={35} height={35} />
          <p className="text-xl text-inherit ml-2">PComparator</p>
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <SignButton />
      </NavbarContent>
    </Navbar>
  );
};
