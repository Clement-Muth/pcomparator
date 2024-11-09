"use client";

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from "@nextui-org/react";
import { Eye, Trash2 } from "lucide-react";
import type { ReactNode } from "react";
import { DeletePriceModal } from "~/applications/Prices/Ui/ListPrices/CardPrice/DeletePriceModal/DeletePriceModal";
import { SeeMoreModal } from "~/applications/Prices/Ui/ListPrices/CardPrice/SeeMoreModal";

interface CardPriceDropdownProps {
  trigger: ReactNode;
  price: {
    priceId: string;
    proof: string;
    name: string;
    price: string;
    location: string;
  };
}

export const CardPriceDropdown = ({ trigger, price }: CardPriceDropdownProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onOpenChange: onOpenChangeDelete,
    onClose: onCloseDelete
  } = useDisclosure();
  const items = [
    {
      key: "info",
      label: "See more",
      shortcut: "⌘⇧s",
      icon: <Eye className="w-[18px] pointer-events-none flex-shrink-0" />,
      onPress: onOpen
    },
    // {
    //   key: "edit",
    //   label: "Edit price",
    //   shortcut: "⌘⇧E",
    //   icon: <Pencil className="w-[18px] text-default-500 pointer-events-none flex-shrink-0" />
    // },
    {
      key: "delete",
      label: "Delete price",
      shortcut: "⌘⇧D",
      icon: <Trash2 className="w-[18px] pointer-events-none flex-shrink-0" />,
      onPress: onOpenDelete
    }
  ];

  return (
    <>
      <Dropdown>
        <DropdownTrigger>{trigger}</DropdownTrigger>
        <DropdownMenu aria-label="Dynamic Actions" items={items}>
          {(item) => (
            <DropdownItem
              key={item.key}
              color={item.key === "delete" ? "danger" : "default"}
              className={item.key === "delete" ? "text-danger" : ""}
              shortcut={item.shortcut}
              startContent={item.icon}
              onPress={item.onPress}
            >
              {item.label}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
      {isOpen && <SeeMoreModal isOpen={isOpen} onOpenChange={onOpenChange} {...price} />}
      {isOpenDelete && (
        <DeletePriceModal
          isOpen={isOpenDelete}
          onOpenChange={onOpenChangeDelete}
          onClose={onCloseDelete}
          priceId={price.priceId}
          productName={price.name}
        />
      )}
    </>
  );
};
