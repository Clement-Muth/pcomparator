import { useEffect } from "react";
import { useForm as useFormHook } from "react-hook-form";
import { URL } from "url";
import usePutProduct from "~/applications/Product/Api/usePutProduct";
import { Product } from "~/applications/Product/Domain/Product";
import { useCoreUI } from "~/core/contexte";

interface UseForm {
  onErrorChange: (error: boolean) => void;
  onLoading: () => void;
  onValidate: () => void;
}

const useForm = ({ onErrorChange, onLoading, onValidate }: UseForm) => {
  const { register, handleSubmit, watch, formState } = useFormHook<Product>({
    defaultValues: {
      currency: "eur",
      unity: "g"
    }
  });
  const putProduct = usePutProduct();
  const { toast } = useCoreUI();

  const onSubmit = handleSubmit(async (data: Product) => {
    onLoading();
    await putProduct({
      product: { ...data, image: data.image },
      productId: data.name
    });
    toast.onOpenChange(true);
    onValidate();
  });

  useEffect(() => {
    if (Object.keys(formState.errors).length) onErrorChange(true);
    else onErrorChange(false);
  }, [formState]);

  return {
    register,
    onSubmit,
    picture: (watch("image") as unknown as FileList)?.[0],
    errors: formState.errors
  };
};

export default useForm;
