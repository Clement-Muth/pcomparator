"use client";

import { Button } from "@nextui-org/react";
import { ChartColumnIncreasing, Euro, LayoutDashboard, User } from "lucide-react";
import type { ReactNode } from "react";
import Link from "~/components/Link/Link";

export interface TabbarProps {
  mainButton: ReactNode;
}

export const Tabbar = ({ mainButton }: TabbarProps) => (
  <div className="flex sticky bottom-0 justify-evenly py-4 border-t rounded-t-3xl border-t-transparent shadow-medium bg-white dark:bg-black z-30">
    <Button as={Link} href="/settings" startContent={<User />} variant="light" radius="full" isIconOnly />
    <Button
      as={Link}
      href="/dashboard"
      startContent={<LayoutDashboard />}
      variant="light"
      radius="full"
      isIconOnly
    />
    {mainButton}
    <Button
      as={Link}
      href="/dashboard/my-prices"
      startContent={<Euro />}
      variant="light"
      radius="full"
      isIconOnly
    />
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
