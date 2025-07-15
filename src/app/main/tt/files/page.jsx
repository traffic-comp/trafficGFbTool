"use client";
import FileUpload from "@/app/components/FileUpload";
import useTTStore from "@/store/useTTStore";
import Link from "next/link";

const Files = () => {
  const { files } = useTTStore();
  return (
    <div className="flex">
      <FileUpload />
      <div className="m-[15px] text-[24px] text-center font-bold">
        <p>Загружено {files?.length}</p>
        {files.length ? <Link href={"/main/tt/uploaded"}>Дальше</Link> : ""}
      </div>
    </div >
  );
};

export default Files;
