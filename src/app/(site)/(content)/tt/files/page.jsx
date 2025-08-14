"use client";
import FileUpload from "@/app/components/FileUpload";
import FormList from "@/app/components/FormList";
import useErrorStore from "@/store/useErrorStore";
import useFBStore from "@/store/useFbStore";
import useTTStore from "@/store/useTTStore";
import { useRouter } from "next/navigation";

const Files = () => {
  const router = useRouter();
  const { files, deleteFile } = useTTStore();
  const { setLeads } = useFBStore();
  const { addMessage } = useErrorStore();

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

    const { data } = await res.json();

    addMessage("success", "Данные успешно загружены");
    router.push("/tt/uploaded");
    return setLeads(data);
  };
  return (
    <div className="flex">
      <FileUpload />
      <div className="m-[15px] text-[24px] w-[100%] text-center font-bold">
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

        {files.length ? (
          <button
            onClick={sendFileToServer}
            className="px-[54px] py-[8px] text-center text-[18px] font-semibold border-2 border-[var(--color-main-blue)] rounded-[12px] bg-white cursor-pointer transition duration-300 uppercase mb-[20px]  hover:text-[var(--color-white)] hover:bg-[var(--color-main-blue)]"
          >
            Загрузить Лиды
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Files;
