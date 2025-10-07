import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface FanpageItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  text: string;
  click: () => void;
}
