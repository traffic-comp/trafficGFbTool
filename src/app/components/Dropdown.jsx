"use client";

import { useEffect, useState, useRef } from "react";

const Dropdown = ({ options = [], placeholder = "", onChange, value = "" }) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e) => {
    const val = e.target.value;
    setInputValue(val);
    setOpen(true);
    const filtered = options.filter((opt) =>
      opt.toLowerCase().includes(val.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleSelect = (val) => {
    setInputValue(val);
    onChange(val);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-[150px]" ref={dropdownRef}>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full text-[18px] px-2 py-3 border rounded-[8px]"
        value={inputValue}
        onChange={handleChange}
        onFocus={() => setOpen(true)}
      />
      {open && filteredOptions.length > 0 && (
        <div className="absolute z-10 top-full left-0 right-0 bg-white border rounded-[8px] max-h-[200px] overflow-y-auto shadow-md">
          {filteredOptions.map((opt, i) => (
            <div
              key={i}
              onMouseDown={() => handleSelect(opt)}
              className="px-3 py-2 hover:bg-[var(--color-main-blue)] hover:text-white cursor-pointer"
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
