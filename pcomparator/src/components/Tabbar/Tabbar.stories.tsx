import type { Meta, StoryObj } from "@storybook/react";
import type { FieldValues, RegisterOptions } from "react-hook-form";
import { Tabbar, type TabbarProps } from "~/components/Tabbar/Tabbar";

export default {
  title: "components/Tabbar",
  component: Tabbar
} satisfies Meta<typeof Tabbar>;

type FileObjProps = TabbarProps & RegisterOptions<FieldValues, any>;

const defaultProps: FileObjProps = {};

export const Default: StoryObj = {
  args: {
    ...defaultProps
  }
};
