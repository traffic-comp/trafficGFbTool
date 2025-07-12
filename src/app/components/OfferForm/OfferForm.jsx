"useClient";

import iso from "@/data/iso.js";
import { getOffers } from "@/fetch/kt";
import { fbLeads, ttLeads } from "@/utils/parseLeads";
import { useEffect, useState } from "react";

import s from "./offerform.module.scss";
import useFBStore from "@/store/useFbStore";

const OfferForm = ({ source }) => {
  const [offers, setOffers] = useState([]);
  const { leads, setIsOpen, setResult } = useFBStore();

  const [isoCode, setIsoCode] = useState("");
  const [offer, setOffer] = useState("");
  const [aff, setAff] = useState("");
  const [trafficSource, setTrafficSource] = useState("");

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
      const leadData = fbLeads(leads, isoCode, offer, aff, trafficSource);
      setResult(leadData);
    } else {
      const leadData = ttLeads(leads, isoCode, offer, aff, trafficSource);
      setResult(leadData);
    }

    setIsOpen(true);
  };

  return (
    <>
      <form onSubmit={(e) => submitForm(e)} className={s.form}>
        <div className={s.selectWrapper}>
          <img src="/assets/icon/arrow.png" alt="" />
          <select name="offer" onChange={(e) => setOffer(e.target.value)}>
            <option value="">Offer</option>
            <option value="test">test</option>
            {offers.length
              ? offers.map((offer) => (
                  <option value={offer.name} key={offer.id}>
                    {offer.name}
                  </option>
                ))
              : ""}
          </select>
        </div>
        <div className={s.selectWrapper}>
          <img src="/assets/icon/arrow.png" alt="" />

          <select
            name="countryIp"
            onChange={(e) => setIsoCode(e.target.value)}
            id=""
          >
            <option value="">GEO/Country</option>
            {iso.map((code) => (
              <option value={code} key={code}>
                {code}
              </option>
            ))}
          </select>
        </div>
        <div className={s.selectWrapper}>
          <img src="/assets/icon/arrow.png" alt="" />

          <select name="aff" onChange={(e) => setAff(e.target.value)}>
            <option value="">ID</option>

            {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => (
              <option value={num} key={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <div className={s.selectWrapper}>
          <img src="/assets/icon/arrow.png" alt="" />

          <select
            name="source"
            onChange={(e) => setTrafficSource(e.target.value)}
          >
            <option value="">Source traffic</option>
            <option value="FB">FB</option>
            <option value="Google">Google</option>
            <option value="TT">TikTok</option>
          </select>
        </div>
        <button type="submit" className={s.btn}>
          Prepare
        </button>
      </form>
    </>
  );
};

export default OfferForm;
