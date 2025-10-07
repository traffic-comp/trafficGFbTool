import React, { DetailedHTMLProps, HtmlHTMLAttributes } from "react";

export interface ButtonProps
  extends DetailedHTMLProps<
    HtmlHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  squere?: boolean;
  posY?: string;
  posX?: string;
  blue?: boolean;
  type?: string;
  rotate?: boolean;
  red?: boolean;
}
