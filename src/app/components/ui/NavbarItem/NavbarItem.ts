import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface NavbarItemProms
  extends DetailedHTMLProps<HTMLAttributes<HTMLLinkElement>, HTMLLinkElement> {
  img: string;
  text: string;
  isActive: boolean;
  alt: string;
  href: string;
}
