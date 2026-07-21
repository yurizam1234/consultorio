import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/lib/utils";

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export function Chip({ active, className, ...rest }: ChipProps) {
  return <button type="button" className={cn("chip", active && "active", className)} {...rest} />;
}
