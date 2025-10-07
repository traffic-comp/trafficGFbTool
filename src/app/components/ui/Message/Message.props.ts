import { DetailedHTMLProps, HTMLAttributes } from "react";

export type MessageType = "error" | "success" | "warning";

export interface MessageProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  id: string;
  type: MessageType;
  message: string;
  onRemove: (id: number) => void;
}
