"use client";

import { Plus } from "lucide-react";
import { useLayoutEffect } from "react";
import AddProductModal from "~/applications/Product/Ui/AddProductModal";
import Button from "~/components/Button/Button";
import { useCoreUI } from "~/core/contexte";

const AddProduct = () => {
  const { modal } = useCoreUI();

  return (
    <div>
      <div className="mt-6">
        <Button
          className="flex gap-x-2"
          onClick={() => {
            modal.setModalChildren(<AddProductModal onValidate={() => modal.onOpenChange(false)} />);
            modal.onOpenChange(true);
          }}
        >
          <Plus />
          Add product
        </Button>
      </div>
    </div>
  );
};

export default AddProduct;
