"use client";

import { Root } from "@radix-ui/react-separator";
import Image from "next/image";
import algolia from "public/static/algolia.png";
import { Dispatch, SetStateAction } from "react";
import SearchItem from "~/applications/Product/Ui/SearchProductModal/SearchItem";

export type OnOpen = Dispatch<SetStateAction<boolean>>;

interface AddProductModalProps {
  onValidate?: () => void;
}

const SearchProductModal = ({ onValidate }: AddProductModalProps) => {
  return (
    <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
      <div className="flex flex-col items-center justify-center border-b border-gray-200 bg-white text-center">
        <form className="w-full">
          <div className="flex flex-col items-center justify-center space-y-2 py-4 px-4 md:px-3">
            <div className="flex space-x-1 w-full items-center px-3">
              <Image
                src={algolia}
                alt="logo algolia"
                width={20}
                height={20}
                className="rounded-full"
                style={{ width: "20px", height: "20px" }}
              />
              <input
                type="text"
                placeholder="Search or Enter a product name..."
                className="w-full border-none outline-0"
                data-input-type="searchbar"
              />
            </div>
            <Root className="bg-gray-200 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px" />
            <ul className="w-full space-y-3">
              <SearchItem />
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchProductModal;
