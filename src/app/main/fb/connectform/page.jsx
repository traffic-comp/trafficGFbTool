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
      if (!selectedPage) return;

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
  };

  const unsubscribePage = async () => {
    const appAccessToken =
      "EAAhpx2PEo64BPOOZCNnva8J5iUtnZCm7XM3M7jnm9YXhCN0qCY1zaTwNL4dXRQHoMfV6TAA4e8x808CtbifYrTeYJgxGzpFhwIBEYpaiginsHWHdm9Vgl4G1IK1jqIK3sKVZBErSNKAmxZCCa4gENaaiGzYdtKXiPKHpZAKrHSKqyv13ZCOj5ZBjFv1qfqDmnIfjnG6"; // замени на свои

    const res = await fetch(
      `https://graph.facebook.com/v19.0/682430928288511/subscribed_apps?access_token=${appAccessToken}`
    );

    const data = await res.json();
    console.log("🔌 Отписка от вебхуков:", data);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 rounded-2xl shadow-inner">
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
            <Dropdown
              options={[]}
              value={dto.sheet}
              onChange={(val) => setDto({ ...dto, sheet: val })}
              placeholder="Sheet"
            />
            <Dropdown
              options={[]}
              value={dto.sheet}
              onChange={(val) => setDto({ ...dto, sheet: val })}
              placeholder="Sheet"
            />
            <Dropdown
              options={[]}
              value={dto.sheet}
              onChange={(val) => setDto({ ...dto, sheet: val })}
              placeholder="Sheet"
            />
            <Dropdown
              options={[]}
              value={dto.sheet}
              onChange={(val) => setDto({ ...dto, sheet: val })}
              placeholder="Sheet"
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

      {/* Правая колонка: карточки шаблонов */}
      <div className="w-full md:w-1/2 flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Шаблоны</h2>

        <div className="grid gap-4">
          {/* Карточка шаблона — в реальном коде замени на .map(...) */}
          <div className="p-4 bg-white rounded-xl shadow border relative">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium">Название шаблона</h3>
                <p className="text-sm text-gray-600">Тип: GOOGLESheets</p>
                <p className="text-sm text-gray-600">Форма: "TestForm"</p>
                <p className="text-sm text-gray-600">
                  Таблица: abc123 / Лист: Sheet1
                </p>
              </div>
              <button
                onClick={unsubscribePage}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition text-sm"
              >
                Отписать
              </button>
            </div>
          </div>
          <div className="p-4 bg-white rounded-xl shadow border relative">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium">Название шаблона</h3>
                <p className="text-sm text-gray-600">Тип: GOOGLESheets</p>
                <p className="text-sm text-gray-600">Форма: "TestForm"</p>
                <p className="text-sm text-gray-600">
                  Таблица: abc123 / Лист: Sheet1
                </p>
              </div>
              <button
                onClick={unsubscribePage}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition text-sm"
              >
                Отписать
              </button>
            </div>
          </div>
          <div className="p-4 bg-white rounded-xl shadow border relative">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium">Название шаблона</h3>
                <p className="text-sm text-gray-600">Тип: GOOGLESheets</p>
                <p className="text-sm text-gray-600">Форма: "TestForm"</p>
                <p className="text-sm text-gray-600">
                  Таблица: abc123 / Лист: Sheet1
                </p>
              </div>
              <button
                onClick={unsubscribePage}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition text-sm"
              >
                Отписать
              </button>
            </div>
          </div>
          <div className="p-4 bg-white rounded-xl shadow border relative">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium">Название шаблона</h3>
                <p className="text-sm text-gray-600">Тип: GOOGLESheets</p>
                <p className="text-sm text-gray-600">Форма: "TestForm"</p>
                <p className="text-sm text-gray-600">
                  Таблица: abc123 / Лист: Sheet1
                </p>
              </div>
              <button
                onClick={unsubscribePage}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition text-sm"
              >
                Отписать
              </button>
            </div>
          </div>
          <div className="p-4 bg-white rounded-xl shadow border relative">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium">Название шаблона</h3>
                <p className="text-sm text-gray-600">Тип: GOOGLESheets</p>
                <p className="text-sm text-gray-600">Форма: "TestForm"</p>
                <p className="text-sm text-gray-600">
                  Таблица: abc123 / Лист: Sheet1
                </p>
              </div>
              <button
                onClick={unsubscribePage}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition text-sm"
              >
                Отписать
              </button>
            </div>
          </div>
          <div className="p-4 bg-white rounded-xl shadow border relative">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium">Название шаблона</h3>
                <p className="text-sm text-gray-600">Тип: GOOGLESheets</p>
                <p className="text-sm text-gray-600">Форма: "TestForm"</p>
                <p className="text-sm text-gray-600">
                  Таблица: abc123 / Лист: Sheet1
                </p>
              </div>
              <button
                onClick={unsubscribePage}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition text-sm"
              >
                Отписать
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectForm;
