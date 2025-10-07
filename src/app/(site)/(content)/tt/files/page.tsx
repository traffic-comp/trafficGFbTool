"use client";
import FileUpload from "@/app/components/FileUpload/FileUpload";
import FormList from "@/app/components/FormList/FormList";
import useErrorStore from "@/store/useErrorStore";
import useFBStore from "@/store/useFbStore";
import useTTStore from "@/store/useTTStore";
import { FileData } from "@/interfaces/global";
import { useRouter } from "next/navigation";
import { JSX } from "react";
import s from "./filespage.module.css"; // импорт CSS модуля

const Files = (): JSX.Element => {
  const router = useRouter();
  const { files, deleteFile } = useTTStore();
  const { setLeads } = useFBStore();
  const { addMessage } = useErrorStore();

  const sendFileToServer = async () => {
    if (!files.length) {
      return addMessage("warning", "Нет файлов для загрузки!");
    }
    const formData = new FormData();

    files.forEach(({ file }: FileData) => {
      formData.append("files", file); // добавляем сами файлы
    });

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/tt/uploadLeadsfile`,
      {
        method: "POST",
        body: formData,
      }
    );

    const { data } = await res.json();

    addMessage("success", "Данные успешно загружены");
    router.push("/tt/uploaded");
    return setLeads(data);
  };

  return (
    <div className={s.wrapper}>
      <FileUpload />
      <div className={s.formTitle}>
        <FormList
          data={files}
          renderRow={(file: FileData) => (
            <div className={s.row}>
              <span>{file.file.name}</span>
              <span
                className={s.deleteButton}
                onClick={() => deleteFile(file.id)}
              >
                Удалить
              </span>
            </div>
          )}
        />
        {files.length ? (
          <button onClick={sendFileToServer} className={s.uploadButton}>
            Загрузить Лиды
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Files;
