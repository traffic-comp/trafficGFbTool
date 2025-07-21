import getRandomIpByCountry from "@/utils/getRandomIpByCountry.js";

export const FIELD_KEYWORDS = {
  full_name: [
    "full name",
    "name",
    "fullname",
    "nombre",
    "nome",
    "vollständiger_name",
    "नाम",
    "اسم",
    "שם",
  ],
  phone: [
    "phone",
    "tel",
    "mobile",
    "מספר טלפון",
    "מספר_טלפון",
    "telefono",
    "telefonnummer",
    "телефон",
    "फ़ोन",
    "هاتف",
  ],
  email: [
    "email",
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
    .filter((f) => !allKeywords.some((k) => normalize(f.name).includes(k)))
    .flatMap((f) => f.values)
    .map((val) => val.replace(/_/g, " "))
    .join("; ");
}

export function getFieldValueByKeywords(lead, keywords) {
  const normalizedKeywords = keywords.map(normalize);
  const match = lead.field_data.find((f) =>
    normalizedKeywords.some((k) => normalize(f.name).includes(k))
  );
  return match?.values?.[0] || "";
}

export const fbLeads = (leads, isoCode, offer, aff, trafficSource) => {
  const leadData = leads.map((lead) => {
    return {
      full_name: getFieldValueByKeywords(lead, FIELD_KEYWORDS.full_name),
      phone: getFieldValueByKeywords(lead, FIELD_KEYWORDS.phone),
      email: getFieldValueByKeywords(lead, FIELD_KEYWORDS.email),
      answers: extractAnswers(lead),
      country: isoCode,
      landing: offer,
      landing_name: offer,
      ip: getRandomIpByCountry(isoCode),
      user_id: aff,
      source: trafficSource,
    };
  });
  return leadData;
};

export const ttLeads = (leads, isoCode, offer, aff, trafficSource) => {
  const leadData = leads.map((lead) => ({
    full_name: lead.fullName,
    phone: lead.phone,
    email: lead.email,
    answers: lead.answers,
    country: isoCode,
    landing: offer,
    landing_name: offer,
    ip: getRandomIpByCountry(isoCode),
    user_id: aff,
    source: trafficSource,
  }));
  return leadData;
};
