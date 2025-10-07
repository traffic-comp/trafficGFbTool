import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface EditableItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  className: string;
  data: string | "";
  itemId: number;
  field: string;
  updatedLeads: (id: number, value: string, field: string) => void;
}
