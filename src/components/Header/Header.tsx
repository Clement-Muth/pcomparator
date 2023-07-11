import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { pcomparatorHomepageRoute } from "~/core/routes";

interface HeaderProps {
  children?: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <header className="fixed top-0 w-full flex justify-between px-4 py-3 z-[33]">
      <Link href={pcomparatorHomepageRoute()} className="flex items-center gap-x-2">
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
