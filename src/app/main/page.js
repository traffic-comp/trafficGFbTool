"use client";
import { useEffect, useState } from "react";
import {
  checkSubscribePages,
  getLeadForms,
  getLeadsByForm,
  getPages,
  subscribeLeadForm,
} from "@/fetch/fb.js";
import iso from "@/data/iso.js";
import getRandomIpByCountry from "@/utils/getRandomIpByCountry";
import { sendToCrm } from "@/fetch/crm.js";

const Main = () => {
  const [pages, setPages] = useState([]);
  const [forms, setForms] = useState([]);
  const [activeForm, setActiveForm] = useState("");
  const [leads, setLeads] = useState([]);
  const [offers, setOffers] = useState([]);

  const [isoCode, setIsoCode] = useState("");
  const [offer, setOffer] = useState("");
  const [aff, setAff] = useState("");
  const [trafficSource, setTrafficSource] = useState("");
  const [result, setResult] = useState([]);
  const [complitedLeads, setComplitedLeads] = useState(0);

  const fbPages = async () => {
    const fb_access_token = window.localStorage.getItem("fb_access_token");
    const pagesList = await getPages(fb_access_token);
    setPages(pagesList);
  };

  const ktOffers = async () => {
    const res = await fetch("/api/keitaro");

    const offers = await res.json();
    setOffers(offers);
  };

  useEffect(() => {
    fbPages();
    ktOffers();
  }, []);

  const showLeadsForm = async (pageId, pageAccessToken) => {
    const forms = await getLeadForms(pageId, pageAccessToken);
    subscribeLeadForm(pageId, pageAccessToken);
    checkSubscribePages(pageId, pageAccessToken);
    setActiveForm(pageAccessToken);
    setForms(forms);
  };

  const showLead = async (formId) => {
    console.log(formId);
    const leads = await getLeadsByForm(formId.id, activeForm);
    setLeads(leads);
  };

  const submitForm = (e) => {
    e.preventDefault();

    const FIELD_KEYWORDS = {
      full_name: [
        "full name",
        "name",
        "fullname",
        "nombre",
        "nome",
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
        "بريد",
      ],
    };

    function normalize(str) {
      return str
        .toLowerCase()
        .replace(/[_\-]/g, " ") // заменяем _ и - на пробел
        .replace(/["'“”‘’«»]/g, "") // убираем кавычки
        .trim();
    }

    function getFieldValueByKeywords(lead, keywords) {
      const normalizedKeywords = keywords.map(normalize);
      const match = lead.field_data.find((f) =>
        normalizedKeywords.some((k) => normalize(f.name).includes(k))
      );
      return match?.values?.[0] || "";
    }

    function extractAnswers(lead) {
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

    setResult(leadData);
  };

  return (
    <>
      <div className="flex h-[100vh] overflow-hidden">
        <div className="left w-[80%] flex flex-col h-[100vh]">
          <h2>Fan Pages</h2>
          {pages.length
            ? pages.map((page) => (
                <div
                  className="m-[5px] m-[5px] bg-[#e1e1e1] cursor-pointer"
                  key={page.id}
                  onClick={() => showLeadsForm(page.id, page.access_token)}
                >
                  {page.category} {page.name}
                </div>
              ))
            : ""}
          <hr className="m-[5px]" />
          <h2>Fan Page`s forms</h2>
          {forms.length ? (
            <div className="forms-wrap">
              <div className="forms-container flex justify-between flex-wrap">
                {forms.length
                  ? forms.map((form) => (
                      <button
                        className="mb-[20px]"
                        key={form.id}
                        onClick={() => showLead(form)}
                      >
                        {form.name}
                      </button>
                    ))
                  : ""}
              </div>
            </div>
          ) : (
            ""
          )}
          <hr className="m-[5px]" />
          <h2>Form</h2>
          <form onSubmit={(e) => submitForm(e)}>
            <select name="offer" onChange={(e) => setOffer(e.target.value)}>
              <option value="">Choose Offer</option>
              <option value="test">test</option>
              {offers.length
                ? offers.map((offer) => (
                    <option value={offer.name} key={offer.id}>
                      {offer.name}
                    </option>
                  ))
                : ""}
            </select>
            <select
              name="countryIp"
              onChange={(e) => setIsoCode(e.target.value)}
              id=""
            >
              <option value="">Choose country</option>
              {iso.map((code) => (
                <option value={code} key={code}>
                  {code}
                </option>
              ))}
            </select>
            <select name="aff" onChange={(e) => setAff(e.target.value)}>
              <option value="">Choose your aff</option>

              {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => (
                <option value={num} key={num}>
                  {num}
                </option>
              ))}
            </select>
            <select
              name="source"
              onChange={(e) => setTrafficSource(e.target.value)}
            >
              <option value="">Choose your source</option>
              <option value="FB">FB</option>
              <option value="Google">Google</option>
              <option value="TT">TikTok</option>
            </select>
            <button type="submit">send</button>
          </form>
          <hr className="m-[5px]" />
          <div className="leads overflow-hidden">
            <div className="overflow-y-scroll h-[100%]">
              <h2>Leads from fun page</h2>
              {leads.length
                ? leads.map((lead) => (
                    <div key={lead.id}>
                      <div className="p-[10px]">
                        <p className="text-[18px]">Fields:</p>
                        {lead.field_data.map(({ name, values }) => (
                          <p
                            key={
                              lead.id + Math.floor(Math.random() * Date.now())
                            }
                          >
                            <b>{name}</b>: {...values}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))
                : ""}
            </div>
          </div>
        </div>
        <div className="right flex flex-col h-[100vh] w-[20%]">
          <div className="result-block h-[100%] overflow-y-scroll">
            <p className="text-center p-[10px]">
              Загружено  {complitedLeads} / {result.length}
            </p>
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
      </div>
    </>
  );
};

export default Main;
