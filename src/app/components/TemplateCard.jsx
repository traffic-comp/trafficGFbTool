"use client";

import { getPages } from "@/fetch/fb";
import { deleteTemplate, updateTemplate } from "@/fetch/template";
import { useState } from "react";

const TemplateCard = ({ template, forms, pages }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [field, setField] = useState({
    name: template.name || "",
    type: template.type || "",
    adset: template.adset || "",
    tableId: template.tableId || "",
    sheet: template.sheet || "",
  });

  const fetchUpdateTemplate = async (formId) => {
    await updateTemplate(field, formId);

    setIsEdit(false);
  };

  const unSubscribe = async (_id, formId) => {
    await deleteTemplate(_id, formId);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="flex justify-between items-start gap-6">
        {!isEdit ? (
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-gray-800">
              Название шаблона: {field.name}
            </h3>
            <p className="text-sm text-gray-600">Тип: {field.type}</p>
            <p className="text-sm text-gray-600">Адсет: {field.adset}</p>
            <p className="text-sm text-gray-600">
              Таблица: {field.tableId} / Лист: {field.sheet}
            </p>
          </div>
        ) : (
          <form className="grid grid-cols-1 gap-4 w-full max-w-md">
            {[
              { label: "Название", key: "name" },
              { label: "Адсет", key: "adset" },
              { label: "Таблица", key: "tableId" },
              { label: "Лист", key: "sheet" },
            ].map(({ label, key }) => (
              <label key={key} className="flex flex-col text-sm text-gray-700">
                <span className="mb-1">{label}:</span>
                <input
                  type="text"
                  value={field[key]}
                  onChange={(e) =>
                    setField({ ...field, [key]: e.target.value })
                  }
                  className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
            ))}
          </form>
        )}

        <div className="flex flex-col gap-2 min-w-[130px]">
          {!isEdit ? (
            <>
              <button
                onClick={() => unSubscribe(template._id, template.formId)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition text-sm cursor-pointer"
              >
                Отписать
              </button>
              <button
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md transition text-sm cursor-pointer"
                onClick={() => setIsEdit(true)}
              >
                Редактировать
              </button>
            </>
          ) : (
            <>
              <button
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md transition text-sm cursor-pointer"
                onClick={() => fetchUpdateTemplate(template.formId)}
              >
                Сохранить
              </button>
              <button
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md transition text-sm cursor-pointer"
                onClick={() => setIsEdit(false)}
              >
                Отменить
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
