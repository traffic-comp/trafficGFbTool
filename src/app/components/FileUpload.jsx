'use client'
import useTTStore from "@/store/useTTStore";
import { useState } from "react";

const FileUpload = () => {
  const { setFiles, files } = useTTStore();

  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      setFiles({ file, id: crypto.randomUUID() });
    }
  };

  const addFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFiles({ file, id: crypto.randomUUID() });
    e.target.value = "";
  };


  return (
    <div
      className="fileUpload w-[fit-content]"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center mb-[36px] px-[80px] py-[20px] rounded-[10px] bg-[var(--color-gray)]">
        <div className="border border-dotted border-white mb-[20px] p-[24px] rounded-full">
          <div className="flex flex-col items-center justify-center w-[150px] h-[150px] rounded-full bg-white">
            <img
              src="../../assets/icon/upload.png"
              alt="upload icon"
              className="mb-2 w-[37px] h-[auto]"
            />
            <p className="text-white  text-[14px] text-[#515151]">
              Upload file
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-4 text-[var(--color-white)]">Allowed format</p>
          <p className="text-4 text-[var(--color-white)]">XLSX</p>
        </div>
      </div>

      <div className="relative">
        <label
          htmlFor="file"
          className="block w-full h-full relative cursor-pointer"
        >
          <input
            type="file"
            id="file"
            onChange={addFile}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-[2]"
          />
          <span className="flex items-center justify-center gap-[10px] p-[9px] w-full text-[18px] border-2 border-[#52525b] font-medium text-[#515151] bg-transparent rounded-[8px] z-[1]">
            <span>Browse file or drop here</span>
            <img
              src="../../assets/icon/upload.png"
              alt="Browse file icon"
              className="w-[32px] h-[auto]"
            />
          </span>
        </label>
      </div>
    </div>
  );
};

export default FileUpload;
