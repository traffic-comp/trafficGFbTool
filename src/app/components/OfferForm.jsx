"useClient";

import { getOffers } from "@/fetch/kt";
import { fbLeads, ttLeads } from "@/utils/parseLeads";
import { useEffect, useState } from "react";

import useFBStore from "@/store/useFbStore";
import useStore from "@/store/useStore";
import useErrorStore from "@/store/useErrorStore";
import Dropdown from "./Dropdown";

const OfferForm = ({ source }) => {
  const [offers, setOffers] = useState([]);
  const { leads, setResult, result, setLeads } = useFBStore();
  const { setIsOpen } = useStore();

  const [offer, setOffer] = useState("");
  const [aff, setAff] = useState("");
  const [trafficSource, setTrafficSource] = useState("");

  const { addMessage } = useErrorStore();

  const ktOffers = async () => {
    const offers = await getOffers();

    if (offers) {
      return setOffers(offers);
    }

    setOffers([]);
    addMessage("error", "Ошибка получении офферов с кт");
  };

  useEffect(() => {
    ktOffers();
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    if (source === "fb") {
      if (leads && offer && aff && trafficSource) {
        const leadData = fbLeads(leads, offer, aff, trafficSource);
        if (leadData) {
          setResult(fbLeads(leads, offer, aff, trafficSource));
          setIsOpen(true);
          return addMessage("success", "Данные дополнены!");
        }
      }
      return addMessage("warning", "Сперва заполни форму");
    } else {
      if (leads && offer && aff && trafficSource) {
        const leadData = ttLeads(leads, offer, aff, trafficSource);

        if (leadData) {
          setResult(ttLeads(leads, offer, aff, trafficSource));
          console.log(result);
          setIsOpen(true);
          return addMessage("success", "Данные дополнены!");
        }
      }

      return addMessage("warning", "Сперва заполни форму");
    }
  };

  const filterByToDay = () => {
    const today = new Date(); // сегодняшняя дата
    const yyyy = today.getFullYear();
    const mm = today.getMonth();
    const dd = today.getDate();

    const todayLeads = leads.filter((lead) => {
      const d = new Date(lead.created_time);
      return (
        d.getFullYear() === yyyy && d.getMonth() === mm && d.getDate() === dd
      );
    });

    const mapped = todayLeads.map((lead) => ({ ...lead, country: lead.geo }));

    setLeads(todayLeads);
    setResult(mapped);
  };

  return (
    <>
      <form
        onSubmit={(e) => submitForm(e)}
        className="OfferForm flex items-center gap-[12px]"
      >
        <Dropdown
          options={offers.map((o) => o.name)}
          value={offer}
          onChange={(val) => setOffer(val)}
          placeholder="Offer"
        />

        <Dropdown
          options={Array.from({ length: 100 }, (_, i) => (i + 1).toString())}
          value={aff}
          onChange={(val) => setAff(val)}
          placeholder="Aff ID"
        />

        <Dropdown
          options={["FB", "Google", "TikTok"]}
          value={trafficSource}
          onChange={(val) => setTrafficSource(val)}
          placeholder="Traffic Source"
        />
        {source === "fb" ? (
          <button
            type="submit"
            onClick={filterByToDay}
            className="px-5 py-3  text-center font-[600] boder-0 border-[2px] border-[var(--color-main-blue)] rounded-[8px] bg-white duration-300 uppercase cursor-pointer hover:text-white hover:bg-[var(--color-main-blue)]"
          >
            Today
          </button>
        ) : null}

        <button
          type="submit"
          className="px-5 py-3  text-center font-[600] boder-0 border-[2px] border-[var(--color-main-blue)] rounded-[8px] bg-white duration-300 uppercase cursor-pointer hover:text-white hover:bg-[var(--color-main-blue)]"
        >
          Prepare
        </button>
      </form>
    </>
  );
};

export default OfferForm;
