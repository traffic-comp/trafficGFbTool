"use client";

import useFBStore from "@/store/useFbStore";
import { useEffect, useRef, useState } from "react";

const EditableItem = ({ className, data, id, field }) => {
  const { updateLeadData, leads } = useFBStore();

  const [isShovedInput, setIsShovedInput] = useState(false);
  const inputRef = useRef(null);

  const updateLead = (e) => {
    if (e.key === "Enter") {
      updateLeadData(id, e.target.value, field);
      console.log(leads, "editable");
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
