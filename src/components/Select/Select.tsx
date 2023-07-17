import * as SelectRadix from "@radix-ui/react-select";
import clsx from "clsx";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { ForwardedRef, Fragment, ReactNode, Ref, forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface SelectItemProps {
  children: ReactNode;
  className?: string;
  value: string;
}

const SelectItem = forwardRef(({ children, className, value }: SelectItemProps, ref: unknown) => {
  return (
    <SelectRadix.Item
      className={clsx(
        "text-[13px] hover:bg-gray-100 cursor-pointer leading-none rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none ",
        className
      )}
      value={value}
      ref={ref as Ref<HTMLDivElement>}
    >
      <SelectRadix.ItemText>{children}</SelectRadix.ItemText>
      <SelectRadix.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
        <CheckIcon />
      </SelectRadix.ItemIndicator>
    </SelectRadix.Item>
  );
});

export interface SelectProps extends Partial<UseFormRegisterReturn> {
  title: string;
  items: { label: string; value: string }[];
  defaultValue?: string;
  className?: string;
  errorWithoutMessage?: boolean;
}

const Select = forwardRef(
  ({ title, defaultValue, items, className, errorWithoutMessage, ...register }: SelectProps, ref) => {
    return (
      <SelectRadix.Root
        defaultValue={defaultValue}
        name={register.name}
        onValueChange={(value) => register.onChange?.({ target: { name: register.name, value } })}
      >
        <SelectRadix.Trigger
          className={clsx(
            errorWithoutMessage ? "border-red9" : "border-gray-200",
            "flex rounded-md border h-[36px] text-sm shadow-sm items-center px-[15px]",
            "[&>span:nth-of-type(1)]:w-full [&>span:nth-of-type(1)]:flex",
            className
          )}
          aria-label={title}
        >
          <SelectRadix.Value placeholder={title} />
          <SelectRadix.Icon>
            <ChevronDownIcon />
          </SelectRadix.Icon>
        </SelectRadix.Trigger>
        <SelectRadix.Portal className={clsx("z-40 border")}>
          <SelectRadix.Content className="overflow-hidden bg-white rounded-md shadow-md">
            <SelectRadix.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white cursor-default">
              <ChevronUpIcon />
            </SelectRadix.ScrollUpButton>
            <SelectRadix.Viewport className="p-[5px]">
              <SelectRadix.Group>
                <SelectRadix.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
                  {title}
                </SelectRadix.Label>
                {items?.map(({ label, value }) => (
                  <Fragment key={label}>
                    <SelectItem value={value} ref={ref}>
                      {label}
                    </SelectItem>
                  </Fragment>
                ))}
              </SelectRadix.Group>
            </SelectRadix.Viewport>
            <SelectRadix.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white cursor-default">
              <ChevronDownIcon />
            </SelectRadix.ScrollDownButton>
          </SelectRadix.Content>
        </SelectRadix.Portal>
      </SelectRadix.Root>
    );
  }
);

export default Select;
