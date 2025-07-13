import s from './fileupload.module.scss'

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
    console.log(files);
  };

  console.log(files);

  return (
    <div
      className={(s.fileuploadContainer, { [s.dragging]: isDragging })}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className={s.fileupload}>
        <div className={s.dropdownRound}>
          <div className={s.dropdown}>
            <img src="../../assets/icon/upload.png" alt="upload icon" />
            <p className="text-white">Upload file</p>
          </div>
        </div>

        <div className={s.dropdownText}>
          <p className={s.allowed}>Allowed format</p>
          <p className={s.fileType}>XLSX</p>
        </div>
      </div>

      <div className={s.chooseFile}>
        <label htmlFor="file">
          <input
            type="file"
            id="file"
            onChange={addFile}
            className={s.fileInput}
          />
          <span className={s.buttonContent}>
            <span>Browse file or drop here</span>
            <img src="../../assets/icon/upload.png" alt="Browse file icon" />
          </span>
        </label>
      </div>
    </div>
  );
};

export default FileUpload;
