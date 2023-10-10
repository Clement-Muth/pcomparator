"use client";

import { Root } from "@radix-ui/react-separator";
import clsx from "clsx";
import { CornerDownLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import algolia from "public/static/algolia.png";
import { Dispatch, SetStateAction } from "react";
import useSearch from "~/applications/Product/Api/useSearch";
import SearchItem from "~/applications/Product/Ui/SearchProductModal/SearchItem";
import { searchPageRoute } from "~/core/routes";

export type OnOpen = Dispatch<SetStateAction<boolean>>;

interface SearchProductModalProps {
  onValidate?: () => void;
}

const SearchProductModal = ({ onValidate }: SearchProductModalProps) => {
  const { onSearch, searchResult } = useSearch();

  return (
    <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200 md:dark:border-gray-800">
      <div className="flex flex-col items-center justify-center border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-black text-center w-full">
        <div className="w-full">
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
                className="w-full border-none outline-0 dark:bg-black"
                data-input-type="searchbar"
                onChange={async (e) => {
                  onSearch(e.target.value);
                }}
              />
              <button
                type="submit"
                className="px-2 py-1 rounded-md bg-cyan-50 hover:bg-cyan-100 dark:bg-cyan-950 dark:hover:bg-cyan-900 cursor-pointer"
              >
                <CornerDownLeft width={20} height={20} className="" />
              </button>
            </div>
            <Root
              className={clsx(
                "bg-gray-200 dark:bg-gray-800",
                "data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
              )}
            />
            {searchResult?.categories.length ? (
              <ul className="w-full">
                {searchResult.categories.map((res, i) => (
                  <Link
                    href={searchPageRoute(res.id, searchResult.search)}
                    onClick={() => onValidate?.()}
                    key={`${res.id}-${i}`}
                  >
                    <SearchItem name={res.name} image={res.image} />
                  </Link>
                ))}
              </ul>
            ) : (
              <p>No result</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchProductModal;
