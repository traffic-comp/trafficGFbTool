"use client";
import { useEffect, useState } from "react";
import useFBStore from "@/store/useFbStore";

const LeadsList = ({
  headers = [],
  data = [],
  renderRow,
  containerStyle = {},
  isResult,
}) => {
  const columnCount = headers.length;

  const gridStyle = containerStyle.gridTemplateColumns
    ? containerStyle
    : { gridTemplateColumns: `repeat(${columnCount}, 1fr)` };


  return (
    <div className="leadList flex flex-col h-[calc(100vh-40px-24px)] overflow-hidden">
      <div
        className="grid grid-cols-4 py-2 pl-[20px] px-33px shrink-0 text-[var(--color-second-gray)]"
        style={gridStyle}
      >
        {headers.map((header, i) => (
          <span key={i}>{header}</span>
        ))}
      </div>

      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        {data?.map((item, index) => (
          <div
            className="relative"
            key={index}
            // onClick={isResult ? () => showMenu(index) : () => {}}
          >
            <div
              className="grid px-[12px] py-[16px] cursor-pointer hover:bg-[ghostwhite]"
              style={gridStyle}
            >
              {renderRow(
                item,
                "overflow-hidden text-ellipsis whitespace-nowrap"
              )}
            </div>
            {/* {isResult && activeMenu === index && activeMenu !== null ? (
              <div className="absolute z-2 right-[15px] bottom-[-30px] p-[10px] rounded-[10px] bg-white shadow-[0px_4px_6px_1px_#00030533] cursor-pointer hover:bg-[ghostwhite]">
                <span onClick={() => removeLead(item.phone)}>Удалить</span>
              </div>
            ) : (
              ""
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadsList;
