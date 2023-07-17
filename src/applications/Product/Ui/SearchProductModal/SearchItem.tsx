import Image from "next/image";
import logo from "public/static/logo.png";

const SearchItem = () => {
  return (
    <li className="flex items-center w-full p-3 space-x-4 cursor-pointer rounded-md hover:bg-cyan-100">
      <Image
        src={logo}
        alt="logo"
        width={20}
        height={20}
        className="rounded-full"
        style={{ width: "20px", height: "20px" }}
      />
      <span className="text-ellipsis whitespace-nowrap overflow-hidden">
        PriceComparator - Compare prices of many products
      </span>
    </li>
  );
};

export default SearchItem;
