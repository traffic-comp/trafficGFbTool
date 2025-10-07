"use client";

import Dropdown from "@/app/components/Dropdown/Dropdown";
import TemplateCard from "@/app/components/TemplateCard/TemplateCard";
import { getLeadForms, getPages, subscribeLeadForm } from "@/fetch/fb";
import { getOffers } from "@/fetch/kt";
import { getTemplates } from "@/fetch/template";
import useErrorStore from "@/store/useErrorStore";
import { Cookies } from "@/utils/cookies";
import { useEffect, useState } from "react";

const ConnectForm = () => {
  const { addMessage } = useErrorStore();

  const [templates, setTemplates] = useState([]);
  const [dto, setDto] = useState({
    pages: [],
    pageForms: [],
    page: "",
    form: "",
    type: "",
    tableId: "",
    sheet: "",
    ad: "",
    pageId: "",
    user_id: 0,
    offers: [],
    offer: "",
    source: "",
  });

  useEffect(() => {
    const fetchPages = async () => {
      const fb_access_token = Cookies.get("fb_access_token");
      const data = await getPages(fb_access_token);
      setDto((prev) => ({ ...prev, pages: data }));
    };

    const fetchGetTemplates = async () => {
      const userId = Cookies.get("userId");
      const temp = await getTemplates(userId);
      if (temp.data) {
        setTemplates(temp.data);
      }
    };

    const ktOffers = async () => {
      const offers = await getOffers();

      if (offers) {
        return setDto((prev) => ({ ...prev, offers }));
      }

      addMessage("error", "Ошибка получении офферов с кт");
    };

    ktOffers();
    fetchGetTemplates();
    fetchPages();
  }, []);

  useEffect(() => {
    const fetchForms = async () => {
      const selectedPage = dto.pages.find((p) => p.name === dto.page);
      if (!selectedPage) return;

      const { access_token, id } = selectedPage;

      const forms = await getLeadForms(id, access_token);

      if (!forms.length) {
        return addMessage("error", `Для этой страницы нет доступных форм!`);
      }

      setDto({ ...dto, pageForms: forms, pageId: id });
    };

    fetchForms();
  }, [dto.page]);

  const subscribePage = async () => {
    const form = dto.pageForms.find((form) => form.name === dto.form && form);
    const { access_token, id } = dto.pages.find((p) => p.name === dto.page);

    const { success } = await subscribeLeadForm(id, access_token);
    if (success) {
      addMessage("success", `Форма ${id} успешно подписана!`);
    } else {
      addMessage("error", `Форма ${id} не подписана!`);
    }
    
    const userId = Cookies.get("userId")

    const templateLeadForm = {
      name: form.name,
      formId: form.id,
      type: dto.type,
      tableId: dto.tableId,
      sheet: dto.sheet,
      adset: dto.ad,
      pageId: dto.pageId,
      user_id: dto.user_id,
      landing: dto.offer,
      landing_name: dto.offer,
      source: dto.source,
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
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 rounded-2xl shadow-inner h-[100%] overflow-hidden">
      {/* Левая колонка: форма */}
      <form className="w-full md:w-1/2 bg-white rounded-2xl p-6 shadow-xl flex flex-col gap-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">
            Создать шаблон
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
          <Dropdown
            options={dto.pages?.map((p) => p.name)}
            value={dto.page}
            onChange={(val) => setDto({ ...dto, page: val })}
            placeholder="Fan Page"
          />

          {dto.pageForms.length > 0 && (
            <Dropdown
              options={dto.pageForms?.map((f) => f.name)}
              value={dto.form}
              onChange={(val) => setDto({ ...dto, form: val })}
              placeholder="Fan Page Form"
            />
          )}

          <Dropdown
            options={["CRM", "GOOGLESheets"]}
            value={dto.type}
            onChange={(val) => setDto({ ...dto, type: val })}
            placeholder="Тип шаблона"
          />

          <Dropdown
            options={[]}
            value={dto.ad}
            onChange={(val) => setDto({ ...dto, ad: val })}
            placeholder="Adset"
          />
        </div>

        {dto.type === "GOOGLESheets" && (
          <div className="grid grid-cols-2 gap-4">
            <Dropdown
              options={[]}
              value={dto.tableId}
              onChange={(val) => setDto({ ...dto, tableId: val })}
              placeholder="Table ID"
            />
            <Dropdown
              options={[]}
              value={dto.sheet}
              onChange={(val) => setDto({ ...dto, sheet: val })}
              placeholder="Sheet"
            />
          </div>
        )}
        {dto.type === "CRM" && (
          <div className="grid grid-cols-2 gap-4">
            <Dropdown
              options={["FB", "Google", "TikTok"]}
              value={dto.source}
              onChange={(val) => setDto({ ...dto, source: val })}
              placeholder="source"
            />
            <Dropdown
              options={Array.from({ length: 100 }, (_, i) =>
                (i + 1).toString()
              )}
              value={dto.user_id}
              onChange={(val) => setDto({ ...dto, user_id: val })}
              placeholder="Aff ID"
            />
            <Dropdown
              options={dto.offers.map((o) => o.name)}
              value={dto.offer}
              onChange={(val) => setDto({ ...dto, offer: val })}
              placeholder="landing/landing_name"
            />
          </div>
        )}
        <button
          onClick={subscribePage}
          type="button"
          className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition"
        >
          Подписать
        </button>
      </form>

      <div className="w-full md:w-1/2 flex flex-col gap-4 overflow-auto">
        <h2 className="text-xl font-semibold">Шаблоны</h2>

        <div className="grid gap-4 p-2">
          {templates.length
            ? templates.map((template) => (
                <TemplateCard key={template.formId} template={template} />
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default ConnectForm;
