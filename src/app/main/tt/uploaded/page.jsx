"use client";
import s from "./uploaded.module.scss";
import FormList from "@/app/components/FormList/FormList";
import RawLeadsSection from "@/app/components/RawLeadsSection/RawLeadsSection";
import ResultLeadsPanel from "@/app/components/ResultLeadsPanel/ResultLeadsPanel";
import useFBStore from "@/store/useFbStore";
import useTTStore from "@/store/useTTStore";
import { useEffect, useState } from "react";

const Uploaded = () => {
  const { setLeads, leads } = useFBStore();
  const { files, deleteFile } = useTTStore();

  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 12;
  const totalPages = Math.ceil(leads.length / leadsPerPage);

  const currentLeads = leads.slice(
    (currentPage - 1) * leadsPerPage,
    currentPage * leadsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const sendFileToServer = async (e) => {
    const formData = new FormData();

    files.forEach(({ file }) => {
      formData.append("files", file); // добавляем сами файлы
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/tt/uploadLeadsfile`, {
      method: "POST",
      body: formData,
    });

    const { data, msg } = await res.json();
    setLeads(data);
  };
  return (
    <>
      <button onClick={sendFileToServer} className={s.btn}>
        Загрузить Лиды
      </button>

      <FormList
        data={files}
        click={() => deleteFile(file.id)}
        renderRow={(file) => (
          <>
            <div className={s.filecontent}>
              <span>{file.file.name}</span>
              <span
                className={s.deletefile}
                onClick={() => deleteFile(file.id)}
              >
                Удалить
              </span>
            </div>
          </>
        )}
      />

      <RawLeadsSection
        currentLeads={currentLeads}
        goToPage={goToPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
        source={"tt"}
      />
      <ResultLeadsPanel />
    </>
  );
};

export default Uploaded;
