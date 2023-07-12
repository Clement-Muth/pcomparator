"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import useSignInModal from "~/applications/Authentication/Ui/useSigninModal";
import useAddProductModal from "~/applications/Product/Ui/useAddProductModal";
import Button from "~/components/Button/Button";
import Modal from "~/components/Modal/Modal";

const ModalView = () => {
  const { AddProductModal, openModal } = useAddProductModal();

  return (
    <div>
      <div className="mt-6">
        <Button className="flex gap-x-2" onClick={() => openModal(true)}>
          <Plus />
          Add product
        </Button>
      </div>
      <AddProductModal />
    </div>
  );
};

export default ModalView;
