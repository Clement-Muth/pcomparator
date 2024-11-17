import { Button } from "@nextui-org/react";
import type { Meta, StoryObj } from "@storybook/react";
import { ScanBarcode } from "lucide-react";
import type { FieldValues, RegisterOptions } from "react-hook-form";
import { Tabbar, type TabbarProps } from "~/components/Tabbar/Tabbar";

export default {
  title: "components/Tabbar",
  component: Tabbar
} satisfies Meta<typeof Tabbar>;

type FileObjProps = TabbarProps & RegisterOptions<FieldValues, any>;

const defaultProps: FileObjProps = {
  mainButton: <Button startContent={<ScanBarcode />} isIconOnly />
};

export const Default: StoryObj = {
  args: {
    ...defaultProps
  }
};
