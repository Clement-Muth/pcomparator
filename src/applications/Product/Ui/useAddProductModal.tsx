"use client";

import { useCallback, useMemo, useState } from "react";
import AddProductModal from "~/applications/Product/Ui/AddProductModal";

const useAddProductModal = () => {
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  const AddProductModalCallback = useCallback(() => {
    return <AddProductModal open={showAddProductModal} onOpen={setShowAddProductModal} />;
  }, [showAddProductModal]);

  return useMemo(
    () => ({ openModal: setShowAddProductModal, AddProductModal: AddProductModalCallback }),
    [AddProductModalCallback]
  );
};

export default useAddProductModal;
