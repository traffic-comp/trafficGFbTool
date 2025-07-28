"use client";

import Dropdown from "@/app/components/Dropdown";
import { getLeadForms, getPages, subscribeLeadForm } from "@/fetch/fb";
import { useEffect, useState } from "react";

const ConnectForm = () => {
  const [pages, setPages] = useState([]);

  const [page, setPage] = useState("");

  useEffect(() => {
    const fetchPages = async () => {
      const fb_access_token = window.localStorage.getItem("fb_access_token");
      const data = await getPages(fb_access_token);
      setPages(data);
    };
    fetchPages();
  }, []);

  const subscribePage = async () => {
    const { access_token, id } = pages.find((p) => p.name === page);
    const forms = await getLeadForms(id, access_token);

    if (!forms.length) {
      return console.log("form net");
    }

    const data = await subscribeLeadForm(id, access_token);
    console.log(data);
  };

  return (
    <>
      <div>

        

      </div>
      <Dropdown
        options={pages?.map((p) => p.name)}
        value={page}
        onChange={(val) => setPage(val)}
        placeholder="Fan Page"
      />

      <button onClick={subscribePage}>Подписать</button>
    </>
  );
};

export default ConnectForm;
