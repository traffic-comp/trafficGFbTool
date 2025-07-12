import useFBStore from "@/store/useFbStore";
import LeadsList from "../LeadsList/LeadsList";
import s from "./resultleadspanel.module.scss";

const ResultLeadsPanel = () => {
  const { isOpen, setIsOpen, result } = useFBStore();
  return (
    <>
      {isOpen && (
        <div className={s.overlay} onClick={() => setIsOpen(false)}></div>
      )}

      <div className={`${s.resultLeads} ${isOpen ? s.open : ""}`}>
        <div
          className={s.readyToLoad}
          style={{
            overflow: "scroll",
            height: "100%",
          }}
        >
          <LeadsList
            headers={[
              "Full Name",
              "Email",
              "Phone",
              "Answers",
              "Country",
              "Source",
              "User_id",
              "Landing/Landing name",
              "IP",
            ]}
            data={result}
            renderRow={(lead) => (
              <>
                <span>{lead.full_name}</span>
                <span>{lead.phone}</span>
                <span>{lead.email}</span>
                <span>{lead.answers}</span>
                <span>{lead.country}</span>
                <span>{lead.source}</span>
                <span>{lead.user_id}</span>
                <span>
                  {lead.landing}/{lead.landing_name}
                </span>
                <span>{lead.ip}</span>
              </>
            )}
          />

          <button className={s.verticalBtn} onClick={() => setIsOpen(!isOpen)}>
            Ready to Load
          </button>

          {isOpen && (
            <button
              className={`${s.verticalBtn} ${s.crm}`}
              onClick={() => alert("Action")}
            >
              Send to CRM
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ResultLeadsPanel;
