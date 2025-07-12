"use client";

import OfferForm from "@/app/components/OfferForm/OfferForm";
import { sendToCrm } from "@/fetch/crm";
import { useState } from "react";

const Page = () => {
  const [rawLeads, setRawLeads] = useState([]);
  const [result, setResult] = useState([]);
  const [files, setFiles] = useState([]);

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
    setRawLeads(data);
  };

  const addFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFiles((prev) => [...prev, { file, id: crypto.randomUUID() }]);

    e.target.value = "";
  };

  const deleteFile = (id) => {
    console.log(id);
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  console.log(rawLeads);
  return (
    <>
      <label
        htmlFor="file"
        className="block text-center w-[30%] m-[auto] mt-[10px] py-5 bg-[red] rounded-md"
      >
        <p className="text-white">Выбирите файл</p>
        <input
          type="file"
          className="hidden"
          id="file"
          onChange={(e) => addFile(e)}
        />
      </label>
      <div className="file-list flex gap-2 p-2">
        {files.length
          ? files.map(({ file, id }, idx) => (
              <p
                key={file}
                className="bg-[green]  text-white flex flex-col items-center justify-center rounded-md"
              >
                <span>
                  {file.name}
                  {idx}
                </span>
                <span
                  className="bg-[red] p-[1px] self-end cursor-pointer"
                  onClick={() => deleteFile(id)}
                >
                  D
                </span>
              </p>
            ))
          : ""}
        {files.length ? <button onClick={sendFileToServer}>Send</button> : ""}
      </div>

      <ul>
        {rawLeads.length
          ? rawLeads.map((lead) => (
              <li key={lead.phone}>
                <p>Email: {lead.email}</p>
                <p>Full name: {lead.full_name}</p>
                <p>Phone number: {lead.phone}</p>
                <p>Answer: {lead.answers}</p>
              </li>
            ))
          : ""}
      </ul>
      <OfferForm setResult={setResult} leads={rawLeads} />
      <div className="">
        <div className="result-block h-[100%] overflow-y-scroll">
          <hr className="m-[5px]" />
          <h2>Ready to load</h2>
          {result.length
            ? result.map((res) => (
                <div className="mb-[10px] m-[5px] bg-[#e1e1e1]" key={res.ip}>
                  <p>full_name: {res.full_name}</p>
                  <p>phone: {res.phone}</p>
                  <p>email: {res.email}</p>
                  <p>answers: {res.answers}</p>
                  <p>country: {res.country}</p>
                  <p>source: {res.source}</p>
                  <p>user_id: {res.user_id}</p>
                  <p>landing: {res.landing}</p>
                  <p>landing_name: {res.landing_name}</p>
                  <p>ip: {res.ip}</p>
                </div>
              ))
            : ""}
        </div>
        <button onClick={() => sendToCrm(result)}>Send</button>
      </div>
    </>
  );
};

export default Page;
