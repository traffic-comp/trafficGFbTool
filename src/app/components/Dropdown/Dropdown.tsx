"use client";

import { useEffect, useState, useRef, JSX } from "react";
import type { DropdownProps } from "./Dropdown.props.js";
import type { React } from "next/dist/server/route-modules/app-page/vendored/rsc/entrypoints.js";
import s from "./dropdown.module.css";

const Dropdown = ({
  options = [],
  placeholder = "",
  onValueChange,
  value = "",
}: DropdownProps):JSX.Element => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(() => val);
    setOpen(true);
    const filtered = options.filter((opt) =>
      opt.toLowerCase().includes(val.toLowerCase())
    );
    console.log(filtered);
    setFilteredOptions(filtered);
  };

  const handleSelect = (val: string) => {
    setInputValue(val);
    onValueChange(val);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        e.target instanceof Node &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={s.dropdownContainer} ref={dropdownRef}>
      <input
        type="text"
        placeholder={placeholder}
        className={s.input}
        value={inputValue}
        onChange={handleChange}
        onBlur={(e) => onValueChange(e.target.value)}
        onFocus={() => setOpen(true)}
      />
      {open && filteredOptions.length > 0 && (
        <div className={s.dropdown}>
          {filteredOptions.map((opt, i) => (
            <div
              key={i}
              onMouseDown={() => handleSelect(opt)}
              className={s.option}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
