"use client";
import FileUpload from "@/app/components/FileUpload/FileUpload";
import s from "./file.module.scss";
import useFBStore from "@/store/useFbStore";
import useTTStore from "@/store/useTTStore";
import { useEffect, useState } from "react";
import Link from "next/link";

const Files = () => {
  const { setLeads } = useFBStore();
  const { files, clear } = useTTStore();

  const sendFileToServer = async (e) => {
    const formData = new FormData();

    files.forEach(({ file }) => {
      formData.append("files", file); // добавляем сами файлы
    });

    const res = await fetch("http://localhost:8080/tt/uploadLeadsfile", {
      method: "POST",
      body: formData,
    });

    const { data, msg } = await res.json();
    setLeads(data);
  };

  useEffect(() => {
    clear();
  }, []);

  return (
    <>
      <FileUpload />
      <div className={s.loadedfiles}>
        <p>Загружено {files.length} </p>
        {files.length ? <Link href={"/main/tt/uploaded"}>Дальше</Link> : ""}
      </div>
    </>
  );
};

export default Files;
