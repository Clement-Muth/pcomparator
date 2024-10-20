import { Image, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { SignButton } from "~/applications/Authentication/Ui/Signin/SignButton/SignButton";
import Link from "~/components/Link/Link";
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
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {/* <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem> */}
        <SignButton />
      </NavbarContent>
    </Navbar>
  );
};
