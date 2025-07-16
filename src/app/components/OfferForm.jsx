"useClient";

import iso from "@/data/iso.js";
import { getOffers } from "@/fetch/kt";
import { fbLeads, ttLeads } from "@/utils/parseLeads";
import { useEffect, useState } from "react";

import useFBStore from "@/store/useFbStore";
import useStore from "@/store/useStore";
import useErrorStore from "@/store/useErrorStore";

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
        className="flex items-center gap-[12px]"
      >
        <div className="relative shadow-[0_1px_1px_0_#0000000f] border-0 rounded-[8px]">
          <img
            src="/assets/icon/arrow.png"
            alt=""
            className="absolute right-[10px] top-[50%] translate-y-[-50%]"
          />
          <select
            name="offer"
            onChange={(e) => setOffer(e.target.value)}
            className="appearance-none w-[150px] text-[18px] border-0 px-2 py-3 border-[2px] border-[transparent]"
          >
            <option value="">Offer</option>
            <option value="test">test</option>
            {offers
              ? offers?.map((offer) => (
                  <option value={offer.name} key={offer.id}>
                    {offer.name}
                  </option>
                ))
              : ""}
          </select>
        </div>
        <div className="relative shadow-[0_1px_1px_0_#0000000f] border-0 rounded-[8px]">
          <img
            src="/assets/icon/arrow.png"
            alt=""
            className="absolute right-[10px] top-[50%] translate-y-[-50%]"
          />

          <select
            name="countryIp"
            onChange={(e) => setIsoCode(e.target.value)}
            id=""
            className="appearance-none w-[150px] text-[18px] border-0 px-2 py-3 border-[2px] border-[transparent]"
          >
            <option value="">GEO/Country</option>
            {iso.map((code) => (
              <option value={code} key={code}>
                {code}
              </option>
            ))}
          </select>
        </div>
        <div className="relative shadow-[0_1px_1px_0_#0000000f] border-0 rounded-[8px]">
          <img
            src="/assets/icon/arrow.png"
            alt=""
            className="absolute right-[10px] top-[50%] translate-y-[-50%]"
          />

          <select
            name="aff"
            onChange={(e) => setAff(e.target.value)}
            className="appearance-none w-[150px] text-[18px] border-0 px-2 py-3 border-[2px] border-[transparent]"
          >
            <option value="">ID</option>

            {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => (
              <option value={num} key={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <div className="relative shadow-[0_1px_1px_0_#0000000f] border-0 rounded-[8px]">
          <img
            src="/assets/icon/arrow.png"
            alt=""
            className="absolute right-[10px] top-[50%] translate-y-[-50%]"
          />

          <select
            name="source"
            onChange={(e) => setTrafficSource(e.target.value)}
            className="appearance-none w-[150px] text-[18px] border-0 px-2 py-3 border-[2px] border-[transparent]"
          >
            <option value="">Source traffic</option>
            <option value="FB">FB</option>
            <option value="Google">Google</option>
            <option value="TT">TikTok</option>
          </select>
        </div>
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
