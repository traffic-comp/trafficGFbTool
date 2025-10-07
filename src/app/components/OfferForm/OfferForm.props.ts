import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface OfferFormProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  source: string;
}
