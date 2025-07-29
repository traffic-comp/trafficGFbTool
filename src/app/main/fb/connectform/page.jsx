"use client";

import Dropdown from "@/app/components/Dropdown";
import { getLeadForms, getPages, subscribeLeadForm } from "@/fetch/fb";
import useErrorStore from "@/store/useErrorStore";
import { useEffect, useState } from "react";

const ConnectForm = () => {
  const { addMessage } = useErrorStore();

  const [dto, setDto] = useState({
    pages: [],
    pageForms: [],
    page: "",
    form: "",
    type: "",
    tableId: "",
    sheet: "",
    ad: "",
  });

  const [isSubscribedPage, setIsSubscribedPage] = useState({
    status: false,
  });

  useEffect(() => {
    const fetchPages = async () => {
      const fb_access_token = window.localStorage.getItem("fb_access_token");
      const data = await getPages(fb_access_token);
      console.log(data);
      setDto({ ...dto, pages: data });
    };
    fetchPages();
  }, []);

  useEffect(() => {
    const fetchForms = async () => {
      const selectedPage = dto.pages.find((p) => p.name === dto.page);
      if (!selectedPage) return; // 👈 безопасная проверка

      const { access_token, id } = selectedPage;

      const forms = await getLeadForms(id, access_token);

      if (!forms.length) {
        return addMessage("error", `Для этой страницы нет доступных форм!`);
      }

      setDto({ ...dto, pageForms: forms });
    };

    fetchForms();
  }, [dto.page]);

  const subscribePage = async () => {
    const formId = dto.pageForms.find((form) => form.name === dto.form && form);
    const { access_token, id } = dto.pages.find((p) => p.name === dto.page);

    const { success } = await subscribeLeadForm(id, access_token);
    if (success) {
      addMessage("success", `Форма ${id} успешно подписана!`);
    } else {
      addMessage("error", `Форма ${id} не подписана!`);
    }
    const userId = localStorage.getItem("userId");

    const templateLeadForm = {
      formId: formId.id,
      type: dto.type,
      tableId: dto.tableId,
      sheet: dto.sheet,
      adset: dto.ad,
      userId,
    };

    const r = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/fb/saveLeadFormTemplate`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(templateLeadForm),
      }
    );

    const d = await r.json();
    console.log(d);
    // setIsSubscribedPage({ ...isSubscribedPage, status: success });
  };

  return (
    <>
      <div className="flex gap-5">
        <Dropdown
          options={dto.pages?.map((p) => p.name)}
          value={dto.page}
          onChange={(val) => setDto({ ...dto, page: val })}
          placeholder="Fan Page"
        />
        {dto.pageForms.length ? (
          <Dropdown
            options={dto.pageForms?.map((f) => f.name)}
            value={dto.form}
            onChange={(val) => setDto({ ...dto, form: val })}
            placeholder="Fan page form"
          />
        ) : null}
        <Dropdown
          options={["CRM", "GOOGLESheets"]}
          value={dto.type}
          onChange={(val) => setDto({ ...dto, type: val })}
          placeholder="Type"
        />
        <Dropdown
          options={[]}
          value={dto.ad}
          onChange={(val) => setDto({ ...dto, ad: val })}
          placeholder="Adset"
        />
      </div>

      {dto.type === "GOOGLESheets" ? (
        <div className="flex gap-5">
          <Dropdown
            options={[]}
            value={dto.tableId}
            onChange={(val) => setDto({ ...dto, tableId: val })}
            placeholder="TableId"
          />
          <Dropdown
            options={[]}
            value={dto.sheet}
            onChange={(val) => setDto({ ...dto, sheet: val })}
            placeholder="sheet"
          />
        </div>
      ) : (
        ""
      )}

      <button onClick={subscribePage}>Подписать</button>
    </>
  );
};

export default ConnectForm;
