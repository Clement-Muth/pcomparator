import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import InputImage from "~/applications/Product/Ui/AddProductModal/InputImage";
import Input from "~/components/Input/Input";
import Label from "~/components/Input/Label";
import Select from "~/components/Select/Select";

type FormValues = {
  productName: string;
  productPrice: number;
};

interface AddProductFormProps {
  children: ReactNode;
  header: ReactNode;
  onValidate: () => void;
}

const AddProductForm = ({ header, onValidate, children }: AddProductFormProps) => {
  const { register, handleSubmit, formState } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
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
          error={formState.errors.productName?.message as string}
          {...register("productName", { required: "Please specify a product name" })}
        />
        <div className="flex flex-col items-start w-full">
          <Label
            label="Product price"
            error={formState.errors.productPrice?.message as string}
            name="productPrice"
          />
          <div className="flex items-center w-full space-x-2">
            <Select />
            <Input
              errorWithoutMessage={!!formState.errors.productPrice?.message}
              placeholder="19.99"
              {...register("productPrice", { required: "Please specify a product price" })}
            />
          </div>
        </div>
      </div>
      {children}
    </form>
  );
};

export default AddProductForm;
