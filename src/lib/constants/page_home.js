import { container } from "@lib/util";

export const { PLATFORM_KEYS, PLATFORM_LABEL, PLATFORM_OPTIONS } = container(
  "PLATFORM",
  {
    android: "android",
    ios: "ios",
  }
);
