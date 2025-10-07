import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface DropdownProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  options: string[];
  placeholder: string;
  onValueChange: (value: string) => void;
  value: string;
}
