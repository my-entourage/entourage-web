"use client";

import { Icon as IconifyIcon } from "@iconify-icon/react";
import type { ComponentProps } from "react";

type IconProps = ComponentProps<typeof IconifyIcon> & {
  size?: number | string;
};

export function Icon({ size = 24, style, ...props }: IconProps) {
  return (
    <IconifyIcon
      style={{ fontSize: size, ...style }}
      {...props}
    />
  );
}
