"use client";

import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import usePutProduct from "~/applications/Product/Api/usePutProduct";
import { Product } from "~/applications/Product/Domain/Product";
import InputImage from "~/applications/Product/Ui/AddProductModal/InputImage";
import Input from "~/components/Input/Input";
import Label from "~/components/Input/Label";
import Select from "~/components/Select/Select";
import { useCoreUI } from "~/core/contexte";

type FormValues = Product;

interface AddProductFormProps {
  children: ReactNode;
  header: ReactNode;
  onValidate: () => void;
  onLoading: () => void;
}

const AddProductForm = ({ header, onValidate, onLoading, children }: AddProductFormProps) => {
  const { register, handleSubmit, formState } = useForm<FormValues>();
  const putProduct = usePutProduct();
  const { toast } = useCoreUI();

  const onSubmit = async (data: FormValues) => {
    onLoading();
    await putProduct({ productId: data.name, product: data });
    toast.onOpenChange(true);
    onValidate();
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-center">
        <InputImage />
      </div>
      {header}
      <div className="flex flex-col items-center justify-center space-y-4 px-4 pb-6 md:px-16">
        <Input
          placeholder="Chocolate Cookies"
          label="Product name"
          error={formState.errors.name?.message as string}
          {...register("name", { required: "Please specify a product name" })}
        />
        <div className="flex flex-col items-start w-full">
          <Label label="Product price" error={formState.errors.price?.message as string} name="price" />
          <div className="flex items-center w-full space-x-2">
            <Select />
            <Input
              errorWithoutMessage={!!formState.errors.price?.message}
              placeholder="19.99"
              {...register("price", { required: "Please specify a product price" })}
            />
          </div>
        </div>
      </div>
      {children}
    </form>
  );
};

export default AddProductForm;
