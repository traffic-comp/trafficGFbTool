"use client";
import FileUpload from "@/app/components/FileUpload/FileUpload";
import s from "./file.module.scss";
import useFBStore from "@/store/useFbStore";
import useTTStore from "@/store/useTTStore";
import { useEffect, useState } from "react";
import Link from "next/link";

const Files = () => {
  const { files, clear } = useTTStore();

  useState(() => {
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
