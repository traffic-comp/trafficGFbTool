import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface FormListProps<T>
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  > {
  data: T[];
  click?: (id?: number | string) => void;
  renderRow: (item: T) => ReactNode;
}
