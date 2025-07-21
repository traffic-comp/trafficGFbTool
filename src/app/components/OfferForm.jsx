"useClient";

import iso from "@/data/iso.js";
import { getOffers } from "@/fetch/kt";
import { fbLeads, ttLeads } from "@/utils/parseLeads";
import { useEffect, useState } from "react";

import useFBStore from "@/store/useFbStore";
import useStore from "@/store/useStore";
import useErrorStore from "@/store/useErrorStore";
import Dropdown from "./Dropdown";

const OfferForm = ({ source }) => {
  const [offers, setOffers] = useState([]);
  const { leads, setResult } = useFBStore();
  const { setIsOpen } = useStore();

  const [isoCode, setIsoCode] = useState("");
  const [offer, setOffer] = useState("");
  const [aff, setAff] = useState("");
  const [trafficSource, setTrafficSource] = useState("");

  const { addMessage } = useErrorStore();

  const ktOffers = async () => {
    const offers = await getOffers();
    setOffers(offers);
  };

  useEffect(() => {
    ktOffers();
  }, []);

  const submitForm = (e) => {
    e.preventDefault();

    if (source === "fb") {
      if (leads && isoCode && offer && aff && trafficSource) {
        const leadData = fbLeads(leads, isoCode, offer, aff, trafficSource);

        if (leadData) {
          setResult(leadData);
          setIsOpen(true);
          return addMessage("success", "Данные дополнены!");
        }
      }
      return addMessage("warning", "Сперва заполни форму");
    } else {
      if (leads && isoCode && offer && aff && trafficSource) {
        const leadData = ttLeads(leads, isoCode, offer, aff, trafficSource);

        if (leadData) {
          setResult(leadData);
          setIsOpen(true);
          return addMessage("success", "Данные дополнены!");
        }
      }

      return addMessage("warning", "Сперва заполни форму");
    }
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
          options={iso}
          value={isoCode}
          onChange={(val) => setIsoCode(val)}
          placeholder="GEO/Country"
        />

        <Dropdown
          options={Array.from({ length: 100 }, (_, i) => (i + 1).toString())}
          value={aff}
          onChange={(val) => setAff(val)}
          placeholder="Aff ID"
        />

        <Dropdown
          options={["FB", "Google", "TT"]}
          value={trafficSource}
          onChange={(val) => setTrafficSource(val)}
          placeholder="Traffic Source"
        />

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
