import type { Lead } from "@/interfaces/global";
import type { LeadsListProps } from "./LeadsList.props";
import s from "./leadlist.module.css";
import { JSX } from "react";

function LeadsList<T>({
  headers,
  data,
  renderRow,
  containerStyle,
  className,
  ...props
}: LeadsListProps<Lead>): JSX.Element {
  const columnCount = headers.length;
  const gridStyle = containerStyle?.gridTemplateColumns
    ? containerStyle
    : { gridTemplateColumns: `repeat(${columnCount}, 1fr)` };

  return (
    <div className={s.leadlist} {...props}>
      <div className={s.header} style={gridStyle}>
        {headers.map((header, i) => (
          <span key={i}>{header}</span>
        ))}
      </div>
      <div className={`${s.leadRowsContainer} ${className}`}>
        {data?.map((item, index) => (
          <div
            className={`${s.leadRow} ${s.leadItem} ${
              item.isDuplicate ? s.dublicate : ""
            }`}
            key={index}
            style={gridStyle}
          >
            {renderRow(item, `${s.leadRowText}`)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeadsList;
