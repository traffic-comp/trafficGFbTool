import phonesData from "@/data/phonesData";
import getRandomIpByCountry from "@/utils/getRandomIpByCountry.js";
import { getCountryISO } from "./getCountryISO";

export const FIELD_KEYWORDS = {
  full_name: [
    "nome_e_cognome",
    "full name",
    "full_name",
    "name",
    "fullname",
    "полное_имя",
    "nombre",
    "nome",
    "vollständiger_name",
    "vollständiger_name",
    "नाम",
    "اسم",
    "שם",
  ],
  phone: [
    "phone",
    "номер_телефона",
    "tel",
    "mobile",
    "telefonnummer",
    "מספר טלפון",
    "מספר_טלפון",
    "phone_number",
    "numero_di_telefono",
    "telefono",
    "telefonnummer",
    "телефон",
    "फ़ोन",
    "هاتف",
  ],
  email: [
    "email",
    "e-mail-adresse",
    "эл_адрес",
    "эл._адрес",
    "e-mail",
    "correo",
    'דוא"ל',
    "דוא’ל",
    "почта",
    "ईमेल",
    "e-mail-adresse",
    "بريد",
  ],
};

export function normalize(str) {
  return str
    .toLowerCase()
    .replace(/[_\-]/g, " ") // заменяем _ и - на пробел
    .replace(/["'“”‘’«»]/g, "") // убираем кавычки
    .trim();
}

export function extractAnswers(lead) {
  const allKeywords = [
    ...FIELD_KEYWORDS.full_name,
    ...FIELD_KEYWORDS.phone,
    ...FIELD_KEYWORDS.email,
  ].map(normalize);

  return lead.field_data
    .filter((f) => {
      const nameNormalized = normalize(f.name);
      // исключаем поля ключевых типов
      return !allKeywords.includes(nameNormalized);
    })
    .flatMap((f) => f.values)
    .map((val) => val.replace(/\s+/g, " ").trim())
    .join("; ");
}

export function getFieldValueByKeywords(lead, keywords) {
  const normalizedKeywords = keywords.map(normalize);

  const match = lead.field_data.find((f) => {
    const nameNormalized = normalize(f.name);
    return normalizedKeywords.includes(nameNormalized); // Точное совпадение
  });

  return match?.values?.[0] || "";
}

export const fbLeads = (leads, offer, aff, trafficSource) => {
  const leadData = leads.map((lead) => {
    try {
      const phoneRaw =
        getFieldValueByKeywords(lead, FIELD_KEYWORDS.phone) || "";
      const phone = phoneRaw.replace(/\s+/g, " ").trim();
      const isoCode = phone ? getCountryISO(phone, phonesData) : "";
      return {
        id: lead.id || "",
        full_name:
          getFieldValueByKeywords(lead, FIELD_KEYWORDS.full_name) || "",
        email:
          (getFieldValueByKeywords(lead, FIELD_KEYWORDS.email) || "")
            .replace(/\s+/g, " ")
            .trim() || "",
        phone,
        description: extractAnswers(lead) || "",
        country: isoCode || "",
        ip: getRandomIpByCountry(isoCode || "IL"),
        created_time: lead.created_time || "",
      };
    } catch (err) {
      console.error("Ошибка при обработке лида (fbLeads):", err);

      return {
        id: lead?.id || "",
        full_name: "",
        phone: "",
        email: "",
        description: "",
        country: "",
        landing: offer || "",
        landing_name: offer || "",
        ip: getRandomIpByCountry("IL"),
        user_id: aff || "",
        source: trafficSource || "",
        created_time: lead?.created_time || "",
      };
    }
  });

  return leadData;
};

export const ttLeads = (leads, offer, aff, trafficSource) => {
  const leadData = leads.map((lead) => {
    const phone = lead.phone.replace(/\s+/g, "");
    const isoCode = getCountryISO(phone, phonesData);

    return {
      full_name: lead.full_name,
      phone: lead.phone.replace(/\s+/g, ""),
      email: lead.email,
      description: lead.description,
      country: isoCode,
      landing: offer,
      landing_name: offer,
      ip: getRandomIpByCountry(isoCode),
      user_id: aff,
      source: trafficSource,
      id: lead.id,
    };
  });
  return leadData;
};
