"use client";
import { deleteTemplate, updateTemplate } from "@/fetch/template";
import { JSX, useState } from "react";
import { TemplateCardProps } from "./TemplateCard.props";
import s from './templatecard.module.css'

const TemplateCard = ({ template }: TemplateCardProps): JSX.Element => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [field, setField] = useState({
    name: template.name || "",
    type: template.type || "",
    adset: template.adset || "",
    tableId: template.tableId || "",
    sheet: template.sheet || "",
    formId: template.formId || "",
  });

  const fetchUpdateTemplate = async (formId: string) => {
    await updateTemplate(field, formId);
    setIsEdit(false);
  };

  const unSubscribe = async (_id: string, formId: string) => {
    await deleteTemplate(_id, formId);
  };

  const keys: { label: string; key: keyof typeof field }[] = [
    { label: "Название", key: "name" },
    { label: "Адсет", key: "adset" },
    { label: "Таблица", key: "tableId" },
    { label: "Лист", key: "sheet" },
  ];

  return (
    <div className={s.card}>
      <div className={s.row}>
        {!isEdit ? (
          <div className={s.details}>
            <h3 className={s.title}>Название шаблона: {field.name}</h3>
            <p className={s.text}>Тип: {field.type}</p>
            <p className={s.text}>Адсет: {field.adset}</p>
            <p className={s.text}>
              Таблица: {field.tableId} / Лист: {field.sheet}
            </p>
          </div>
        ) : (
          <form className={s.form}>
            {keys.map(({ label, key }) => (
              <label key={key} className={s.label}>
                <span>{label}:</span>
                <input
                  type="text"
                  value={field[key]}
                  onChange={(e) =>
                    setField({ ...field, [key]: e.target.value })
                  }
                  className={s.input}
                />
              </label>
            ))}
          </form>
        )}

        <div className={s.actions}>
          {!isEdit ? (
            <>
              <button
                onClick={() => unSubscribe(template._id, template.formId)}
                className={`${s.button} ${s.danger}`}
              >
                Отписать
              </button>
              <button
                className={`${s.button} ${s.primary}`}
                onClick={() => setIsEdit(true)}
              >
                Редактировать
              </button>
            </>
          ) : (
            <>
              <button
                className={`${s.button} ${s.success}`}
                onClick={() => fetchUpdateTemplate(template.formId)}
              >
                Сохранить
              </button>
              <button
                className={`${s.button} ${s.secondary}`}
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
