import { forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import useGetCategories from "~/applications/Product/Api/useGetCategories";
import Label from "~/components/Input/Label";
import Select, { SelectProps } from "~/components/Select/Select";

interface CategorySelectProps extends Partial<UseFormRegisterReturn> {
  error?: string;
}

const CategorySelect = forwardRef(({ error, ...register }: CategorySelectProps, ref) => {
  const { categories, isLoading } = useGetCategories({ id: "categories" });

  if (isLoading) return <></>;

  return (
    <div className="w-full">
      <Label label="Category" name="category" error={error} />
      <Select
        {...register}
        errorWithoutMessage={!!error}
        items={
          isLoading
            ? [{ label: categories[0].name, value: categories[0].name }]
            : categories?.map((category) => ({ label: category.name, value: category.name }))
        }
        title="Category"
        className="w-full"
        ref={ref}
      />
    </div>
  );
});

export default CategorySelect;
