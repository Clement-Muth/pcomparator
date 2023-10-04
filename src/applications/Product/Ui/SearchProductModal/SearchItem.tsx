import Image from "next/image";
import logo from "public/static/logo.png";

interface SearchItemProps {
  image?: string;
  name: string;
}

const SearchItem = ({ image, name }: SearchItemProps) => {
  return (
    <li className="flex items-center w-full p-3 space-x-4 cursor-pointer rounded-md hover:bg-cyan-100 dark:hover:bg-cyan-900">
      <Image
        src={image?.length ? image : logo}
        alt="logo"
        width={20}
        height={20}
        className="rounded-full"
        style={{ width: "20px", height: "20px" }}
      />
      <span className="text-ellipsis whitespace-nowrap text-sm overflow-hidden">{name}</span>
    </li>
  );
};

export default SearchItem;
