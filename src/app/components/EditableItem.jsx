"use client";

import { useEffect, useRef, useState } from "react";

const EditableItem = ({ className, data, id, field, updatedLeads }) => {

  const [isShovedInput, setIsShovedInput] = useState(false);
  const inputRef = useRef(null);

  const updateLead = (e) => {
    if (e.key === "Enter") {
      updatedLeads(id, e.target.value, field);
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
          className={`w-[100%]`}
        />
      ) : (
        data
      )}
    </span>
  );
};

export default EditableItem;
