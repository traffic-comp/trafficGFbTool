"use client";
import FormList from "@/app/components/FormList";
import RawLeadsSection from "@/app/components/RawLeadsSection";
import ResultLeadsPanel from "@/app/components/ResultLeadsPanel";
import useErrorStore from "@/store/useErrorStore";
import useFBStore from "@/store/useFbStore";
import useTTStore from "@/store/useTTStore";
import { useState } from "react";

const Uploaded = () => {
  const { setLeads, leads } = useFBStore();
  const { files, deleteFile } = useTTStore();
  const { addMessage } = useErrorStore();

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
    if (!files.length) {
      return addMessage("warning", "Нет файлов для загрузки!");
    }
    const formData = new FormData();

    files.forEach(({ file }) => {
      formData.append("files", file); // добавляем сами файлы
    });

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/tt/uploadLeadsfile`,
      {
        method: "POST",
        body: formData,
      }
    );

    const { data, msg } = await res.json();

    addMessage("success", "Данные успешно загружены");
    return setLeads(data);
  };
  return (
    <>
      <button
        onClick={sendFileToServer}
        className="px-[54px] py-[8px] text-center text-[18px] font-semibold border-2 border-[var(--color-main-blue)] rounded-[12px] bg-white cursor-pointer transition duration-300 uppercase mb-[20px]  hover:text-[var(--color-white)] hover:bg-[var(--color-main-blue)]"
      >
        Загрузить Лиды
      </button>

      <FormList
        data={files}
        click={() => deleteFile(file.id)}
        renderRow={(file) => (
          <>
            <div className="flex w-full justify-between items-center gap-[10px]">
              <span>{file.file.name}</span>
              <span
                className="bg-[#da4848] text-[18px] py-[9px] px-[38px] rounded-[12px] text-center text-[var(--color-white)]"
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
