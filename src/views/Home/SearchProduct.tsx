"use client";

import { Plus, Search } from "lucide-react";
import { useLayoutEffect } from "react";
import SearchProductModal from "~/applications/Product/Ui/SearchProductModal";
import Button from "~/components/Button/Button";
import { useCoreUI } from "~/core/contexte";

const SearchProduct = () => {
  const { modal } = useCoreUI();

  return (
    <div>
      <div className="mt-6">
        <Button
          className="flex gap-x-2 px-4 md:rounded-full md:shadow-md text-gray-600"
          kind="primary"
          onClick={() => {
            modal.setModalChildren(<SearchProductModal onValidate={() => modal.onOpenChange(false)} />);
            modal.onOpenChange(true);
          }}
        >
          <Search />
          Search a product
        </Button>
      </div>
    </div>
  );
};

export default SearchProduct;
