import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface BtnArrowProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLOrSVGElement>,
    HTMLOrSVGElement
  > {
  fill: string;
  className: string;
}
