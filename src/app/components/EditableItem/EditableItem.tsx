"use client";

import { JSX, useEffect, useRef, useState } from "react";
import type { EditableItemProps } from "./EditableItem.props.js";
import type { React } from "next/dist/server/route-modules/app-page/vendored/ssr/entrypoints.js";
import s from "./editableitem.module.css";
const EditableItem = ({
  className,
  data,
  itemId,
  field,
  updatedLeads,
}: EditableItemProps):JSX.Element => {
  const [isShovedInput, setIsShovedInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateLead = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updatedLeads(itemId, e.currentTarget.value, field); // ✅
      setIsShovedInput(false);
    }
  };

  useEffect(() => {
    if (isShovedInput && inputRef.current) {
      inputRef.current.focus(); // 2. автофокус
    }
  }, [isShovedInput]);

  return (
    <span
      onDoubleClick={() => setIsShovedInput(!isShovedInput)}
      className={className}
    >
      {isShovedInput ? (
        <input
          onKeyDown={(e) => updateLead(e)}
          type="text"
          ref={inputRef}
          defaultValue={data}
          className={s.input}
        />
      ) : (
        data
      )}
    </span>
  );
};

export default EditableItem;
