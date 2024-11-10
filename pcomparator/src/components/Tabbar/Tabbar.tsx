"use client";

import { Button } from "@nextui-org/react";
import { ChartColumnIncreasing, Dumbbell, ScanBarcode, User, Utensils } from "lucide-react";
import Link from "~/components/Link/Link";

export type TabbarProps = {};

export const Tabbar = () => (
  <div className="flex justify-evenly py-4 border-t rounded-t-3xl border-t-transparent shadow-medium">
    <Button as={Link} href="" startContent={<User />} variant="light" radius="full" isIconOnly />
    <Button as={Link} href="" startContent={<Utensils />} variant="light" radius="full" isIconOnly />
    <Button
      startContent={<ScanBarcode />}
      radius="full"
      variant="faded"
      className="p-7 w-18 h-18 -mt-8 border-none shadow-medium"
      isIconOnly
    />
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
