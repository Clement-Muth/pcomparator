import * as SelectRadix from "@radix-ui/react-select";
import clsx from "clsx";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { LegacyRef, ReactNode, Ref, forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface SelectItemProps {
  children: ReactNode;
  className?: string;
  value: string;
}

const SelectItem = forwardRef(
  ({ children, className, value, ...props }: SelectItemProps, ref: Ref<HTMLDivElement>) => {
    return (
      <SelectRadix.Item
        className={clsx(
          "text-[13px] hover:bg-gray-100 cursor-pointer leading-none rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none ",
          className
        )}
        value={value}
        ref={ref}
      >
        <SelectRadix.ItemText>{children}</SelectRadix.ItemText>
        <SelectRadix.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <CheckIcon />
        </SelectRadix.ItemIndicator>
      </SelectRadix.Item>
    );
  }
);

interface SelectProps extends Partial<UseFormRegisterReturn> {
  placeholder?: string;
}

const Select = forwardRef(({ placeholder }: SelectProps, ref: LegacyRef<HTMLDivElement>) => {
  return (
    <SelectRadix.Root defaultValue="eur">
      <SelectRadix.Trigger
        className="flex rounded-md border h-[36px] text-sm shadow-sm items-center px-[15px]"
        aria-label="Currency"
      >
        <SelectRadix.Value placeholder="Currency" />
        <SelectRadix.Icon className="">
          <ChevronDownIcon />
        </SelectRadix.Icon>
      </SelectRadix.Trigger>
      <SelectRadix.Portal className="z-40 border border-gray-200">
        <SelectRadix.Content className="overflow-hidden bg-white rounded-md shadow-md">
          <SelectRadix.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white cursor-default">
            <ChevronUpIcon />
          </SelectRadix.ScrollUpButton>
          <SelectRadix.Viewport className="p-[5px]">
            <SelectRadix.Group>
              <SelectRadix.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
                Currency
              </SelectRadix.Label>
              <SelectItem value="eur">€</SelectItem>
              <SelectItem value="dol">$</SelectItem>
            </SelectRadix.Group>
          </SelectRadix.Viewport>
          <SelectRadix.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white cursor-default">
            <ChevronDownIcon />
          </SelectRadix.ScrollDownButton>
        </SelectRadix.Content>
      </SelectRadix.Portal>
    </SelectRadix.Root>
  );
});

export default Select;
