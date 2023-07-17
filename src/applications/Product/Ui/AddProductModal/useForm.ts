import { useEffect } from "react";
import { useForm as useFormHook } from "react-hook-form";
import usePutProduct from "~/applications/Product/Api/usePutProduct";
import { Product } from "~/applications/Product/Domain/Product";
import { useCoreUI } from "~/core/contexte";

interface UseForm {
  onErrorChange: (error: boolean) => void;
  onLoading: () => void;
  onValidate: () => void;
}

const useForm = ({ onErrorChange, onLoading, onValidate }: UseForm) => {
  const { register, handleSubmit, formState } = useFormHook<Product>({
    defaultValues: {
      currency: "eur",
      unity: "g"
    }
  });
  const putProduct = usePutProduct();
  const { toast } = useCoreUI();

  const onSubmit = handleSubmit(async (data: Product) => {
    onLoading();
    await putProduct({ product: data, productId: data.name });
    toast.onOpenChange(true);
    onValidate();
  });

  // rome-ignore lint/nursery/useExhaustiveDependencies: No more dep needed
  useEffect(() => {
    if (Object.keys(formState.errors).length) onErrorChange(true);
    else onErrorChange(false);
  }, [formState]);

  return { register, onSubmit, errors: formState.errors };
};

export default useForm;
