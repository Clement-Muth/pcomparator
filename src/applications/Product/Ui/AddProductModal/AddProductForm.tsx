"use client";

import { ReactNode, useEffect } from "react";
import CategorySelect from "~/applications/Product/Ui/AddProductModal/CategorySelect";
import InputImage from "~/applications/Product/Ui/AddProductModal/InputImage";
import useForm from "~/applications/Product/Ui/AddProductModal/useForm";
import Input from "~/components/Input/Input";
import Label from "~/components/Input/Label";
import Select from "~/components/Select/Select";

interface AddProductFormProps {
  children: ReactNode;
  header: ReactNode;
  onValidate: () => void;
  onLoading: () => void;
  onErrorChange: (error: boolean) => void;
}

const AddProductForm = ({ header, onValidate, onLoading, onErrorChange, children }: AddProductFormProps) => {
  const { onSubmit, register, picture, errors } = useForm({ onErrorChange, onLoading, onValidate });

  return (
    <form className="w-full" onSubmit={onSubmit}>
      <div className="flex justify-center">
        <InputImage src={picture ? URL.createObjectURL(picture) : undefined} {...register("image")} />
      </div>
      {header}
      <div className="flex flex-col items-center justify-center space-y-4 px-4 pb-6 md:px-10">
        <div className="flex space-x-2 w-full items-end">
          <Input
            placeholder="Chocolate Cookies"
            label="Product name"
            error={errors.name?.message as string}
            breakError
            {...register("name", { required: "Please specify a product name" })}
          />
          <div className="flex flex-col items-start w-full">
            <Label label="Product price" error={errors.price?.message as string} breakError name="price" />
            <div className="flex items-center w-full space-x-2">
              <Select
                defaultValue="eur"
                items={[
                  { value: "eur", label: "€" },
                  { value: "dol", label: "$" }
                ]}
                {...register("currency")}
                title="Currency"
              />
              <Input
                errorWithoutMessage={!!errors.price?.message}
                placeholder="19.99"
                inputMode="numeric"
                {...register("price", {
                  required: "Please specify a product price",
                  pattern: { value: /^[0-9.,]+$/, message: "Please specify a valid price" },
                  maxLength: { value: 6, message: "Your price is out of range" }
                })}
              />
            </div>
          </div>
        </div>
        <div className="flex space-x-2 w-full items-end">
          <Input
            placeholder="Oreo"
            label="Brand of the product"
            error={errors.brand?.message as string}
            breakError
            {...register("brand", {
              required: "Please specify the product brand",
              maxLength: { value: 30, message: "Your brand name is too longue" }
            })}
          />
          <Input
            placeholder="Ralphs"
            label="Market"
            error={errors.market?.message as string}
            breakError
            {...register("market", {
              required: "Please specify the market",
              maxLength: { value: 30, message: "Your market name is too longue" }
            })}
          />
        </div>
        <Input
          placeholder="Location"
          label="Location"
          error={errors.location?.message as string}
          {...register("location", {
            required: "Please specify the location",
            maxLength: { value: 300, message: "Your location name is too longue" }
          })}
        />
        <CategorySelect
          error={errors.category?.message as string}
          {...register("category", { required: "Please specify a category" })}
        />
        <div className="flex flex-col items-start w-full">
          <Label label="Quantity" error={errors.quantity?.message as string} name="quantity" />
          <div className="flex items-center w-full space-x-2">
            <Input
              placeholder="Quantity"
              inputMode="numeric"
              errorWithoutMessage={!!errors.quantity?.message}
              {...register("quantity", {
                required: "Please specify the quantity",
                pattern: { value: /^[0-9.,]+$/, message: "Please specify a valid quantity" },
                maxLength: { value: 6, message: "Your quantity is out of range" }
              })}
            />
            <Select
              className="w-[200px]"
              defaultValue="g"
              items={[
                { value: "g", label: "g" },
                { value: "ml", label: "ml" },
                { value: "unity", label: "unity" },
                { value: "unity-g", label: "unity-g" },
                { value: "unity-ml", label: "unity-ml" }
              ]}
              title="Unity"
              {...register("unity")}
            />
          </div>
        </div>
      </div>
      {children}
    </form>
  );
};

export default AddProductForm;
