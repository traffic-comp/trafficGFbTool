import type { Lead } from "@/interfaces/global";
import type React from "react";
import type { DetailedHTMLProps, HTMLAttributes, SetStateAction } from "react";

export interface RawLeadsSectionProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  currentLeads: Lead[];
  goToPage: (page: number) => void;
  currentPage: number;
  totalPages: number;
  source: string;
}
