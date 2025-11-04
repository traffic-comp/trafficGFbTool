"use client";
import { Cookies } from "@/utils/cookies";
import { FbSpendProps } from "./FbSpend.props";
import { fbSpend } from "@/fetch/fb";
import { useEffect, useState } from "react";
import { IFbSpend } from "@/interfaces/fb";
import s from "./fbspend.module.css";
import Loader from "../ui/Loader/Loader";

const FbSpend = ({ ...props }: FbSpendProps) => {
  const [fbSpendData, setFbSpendData] = useState<IFbSpend[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchFbSpend = async () => {
    const fb_access_token = Cookies.get("fb_access_token");

    const result = await fbSpend(fb_access_token!);

    if (result.length) {
      setFbSpendData(result);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFbSpend();
  }, []);

  return (
    <div {...props}>
      {isLoading && <Loader isLoading={isLoading} />}
      {fbSpendData.length ? (
        <div className={s.scrollContainer}>
          <table className={s.table}>
            <thead>
              <tr>
                <th>Acc id</th>
                <th>Adset id</th>
                <th>Adset name</th>
                <th>Creative id</th>
                <th>Camp id</th>
                <th>Camp name</th>
                <th>Camp status</th>
                <th>Impressions</th>
                <th>CPM</th>
                <th>Clicks (all)</th>
                <th>Link clicks</th>
                <th>CPC (all)</th>
                <th>CPC (link)</th>
                <th>CTR (all)</th>
                <th>CTR (link)</th>
                <th>Leads</th>
                <th>CPS</th>
                <th>Spend</th>
                <th>Date</th>
                <th>Start</th>
                <th>End</th>
              </tr>
            </thead>

            <tbody>
              {fbSpendData.map((item, idx) => (
                <tr key={idx} className={s.tableRow}>
                  <td>{item.accountId}</td>
                  <td>{item.adset_id}</td>
                  <td>{item.adset_name}</td>
                  <td>{item.creative_id}</td>
                  <td>{item.campaign_id}</td>
                  <td>{item.campaign_name}</td>
                  <td>{item.campaign_status}</td>
                  <td>{item.impressions_total}</td>
                  <td>{item.cpm}</td>
                  <td>{item.clicks_total}</td>
                  <td>{item.link_clicks}</td>
                  <td>{item.cpc_all}</td>
                  <td>{item.cpc_link}</td>
                  <td>{item.ctr_all}</td>
                  <td>{item.ctr_link}</td>
                  <td>{item.leads}</td>
                  <td style={{ color: "#25B66E" }}>{item.cps}</td>
                  <td>{item.spend}</td>
                  <td>{item.date}</td>
                  <td>{item.start_time}</td>
                  <td>{item.stop_time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !isLoading && <p>Not Found</p>
      )}
    </div>
  );
};

export default FbSpend;
