import type { Lead } from "@/interfaces/global";
import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface LeadsListProps<T>
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  headers: string[];
  data: Lead[];
  renderRow: (item: T, style: string) => ReactNode;
  containerStyle?: React.CSSProperties;
  className?: string;
}
