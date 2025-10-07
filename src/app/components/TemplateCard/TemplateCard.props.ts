import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface TemplateCardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  template: {
    _id: string | "";
    name: string | "";
    type: string | "";
    adset: string | "";
    tableId: string | "";
    sheet: string | "";
    formId: string | "";
  };
}
