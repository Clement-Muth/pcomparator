"use client";

import { Plus } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import AddProductForm from "~/applications/Product/Ui/AddProductModal/AddProductForm";
import Button from "~/components/Button/Button";
import LoadingDots from "~/components/Loader/LoadingDot";

export type OnOpen = Dispatch<SetStateAction<boolean>>;

interface AddProductModalProps {
  onValidate?: () => void;
}

const AddProductModal = ({ onValidate }: AddProductModalProps) => {
  const [addProduct, setAddProduct] = useState(false);

  return (
    <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
      <div className="flex flex-col items-center justify-center border-b border-gray-200 bg-white pt-8 text-center ">
        <AddProductForm
          onLoading={() => setAddProduct(true)}
          onValidate={() => onValidate?.()}
          header={
            <div className="px-4 py-6 md:px-16 space-y-3">
              <h3 className="font-display text-2xl font-bold">Ajouter un produit</h3>
              <p className="text-sm text-gray-500">
                Ajouter un produit à la liste pour le comparer aux autres.
              </p>
            </div>
          }
        >
          <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 md:px-16 border-t">
            <Button disabled={addProduct} kind="primary" type="submit">
              {addProduct ? (
                <LoadingDots color="#808080" />
              ) : (
                <>
                  <Plus className="h-5 w-5" />
                  <span>Ajouter un produit</span>
                </>
              )}
            </Button>
          </div>
        </AddProductForm>
      </div>
    </div>
  );
};

export default AddProductModal;
