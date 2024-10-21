import { headers } from "next/headers";
import type { Device } from "~/types/device";

export const getDevice = () => {
  return headers().get("x-device") as Device;
};
