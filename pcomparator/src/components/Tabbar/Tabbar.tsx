"use client";

import { Button } from "@nextui-org/react";
import { ChartColumnIncreasing, Dumbbell, User, Utensils } from "lucide-react";
import type { ReactNode } from "react";
import Link from "~/components/Link/Link";

export interface TabbarProps {
  mainButton: ReactNode;
}

export const Tabbar = ({ mainButton }: TabbarProps) => (
  <div className="flex justify-evenly py-4 border-t rounded-t-3xl border-t-transparent shadow-medium bg-white">
    <Button as={Link} href="" startContent={<User />} variant="light" radius="full" isIconOnly />
    <Button as={Link} href="" startContent={<Utensils />} variant="light" radius="full" isIconOnly />
    {mainButton}
    <Button as={Link} href="" startContent={<Dumbbell />} variant="light" radius="full" isIconOnly />
    <Button
      as={Link}
      href=""
      startContent={<ChartColumnIncreasing />}
      variant="light"
      radius="full"
      isIconOnly
    />
  </div>
);
