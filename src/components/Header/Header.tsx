import Image from "next/image";
import { ReactNode } from "react";

interface HeaderProps {
  children?: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <header className="fixed top-0 w-full flex justify-between px-4 py-3">
      <div className="flex items-center gap-x-2">
        <Image
          src="/static/logo.png"
          alt="price comparator logo"
          width={30}
          height={30}
          style={{ width: "100%", height: "100%" }}
        />
        <p className="text-2xl tracking-tighter font-medium">PComparator</p>
      </div>
      {children}
    </header>
  );
};

export default Header;
