"useClient";

import { getOffers } from "@/fetch/kt";
import { fbLeads, ttLeads } from "@/utils/parseLeads";
import { JSX, useEffect, useState } from "react";

import useFBStore from "@/store/useFbStore";
import useStore from "@/store/useStore";
import useErrorStore from "@/store/useErrorStore";
import Dropdown from "../Dropdown/Dropdown";
import formatDate from "@/utils/formatDate";
import { filteredLeads } from "@/fetch/duplicateLeads";
import type { OfferFormProps } from "./OfferForm.props";
import type { Lead } from "@/interfaces/global";
import type { Offer } from "@/interfaces/kt";
import Button from "../ui/Button/Button";
import { getCountryISO } from "@/utils/getCountryISO";
import phonesData from "@/data/phonesData";
import getRandomIpByCountry from "@/utils/getRandomIpByCountry";

const OfferForm = ({ source }: OfferFormProps): JSX.Element => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const { leads, setResult, result, setLeads } = useFBStore();
  const { setIsOpen } = useStore();

  const [offer, setOffer] = useState<string>("");
  const [aff, setAff] = useState<string>("");
  const [trafficSource, setTrafficSource] = useState<string>("");

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

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (source === "fb") {
      if (leads && offer && aff && trafficSource) {
        const leadData = leads.map((lead: Lead) => ({
          ...lead,
          landing: offer,
          landing_name: offer,
          user_id: aff,
          source: trafficSource,
        }));
        if (leadData) {
          const filtered = await filteredLeads(leadData);
          setResult(filtered.data);

          setIsOpen(true);
          return addMessage("success", "Данные дополнены!");
        }
      }
      return addMessage("warning", "Сперва заполни форму");
    } else {
      if (leads && offer && aff && trafficSource) {
        const leadData = leads.map((lead: Lead) => {
          const phone = lead.phone.replace(/\s+/g, "");
          const isoCode = getCountryISO(phone, phonesData);
          
          return {
            ...lead,
            landing: offer,
            landing_name: offer,
            user_id: aff,
            source: trafficSource,
            phone,
            ip: getRandomIpByCountry(isoCode),
          };
        });

        if (leadData) {
          const filtered = await filteredLeads(leadData);

          // просто показываем только новые лиды
          setResult(filtered.data);

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

    const todayLeads = leads.filter((lead: Lead) => {
      const d = new Date(lead.created_time);
      return (
        d.getFullYear() === yyyy && d.getMonth() === mm && d.getDate() === dd
      );
    });

    const mapped = todayLeads.map((lead: Lead) => ({
      ...lead,
      country: lead.geo,
      created_time: formatDate(lead.created_time),
    }));

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
          onValueChange={(val) => setOffer(val)}
          placeholder="Offer"
        />

        <Dropdown
          options={Array.from({ length: 100 }, (_, i) => (i + 1).toString())}
          value={aff}
          onValueChange={(val) => setAff(val)}
          placeholder="Aff ID"
        />

        <Dropdown
          options={["FB", "Google", "TikTok"]}
          value={trafficSource}
          onValueChange={(val) => setTrafficSource(val)}
          placeholder="Traffic Source"
        />
        {source === "fb" ? (
          <Button onClick={filterByToDay}>Today</Button>
        ) : null}

        <Button>Prepare</Button>
      </form>
    </>
  );
};

export default OfferForm;
