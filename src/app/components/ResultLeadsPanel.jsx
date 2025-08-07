import useFBStore from "@/store/useFbStore";
import LeadsList from "@/app/components/LeadsList";
import useStore from "@/store/useStore";
import { sendToCrm } from "@/fetch/crm";
import useErrorStore from "@/store/useErrorStore";
import EditableItem from "./EditableItem";

const ResultLeadsPanel = () => {
  const { result, setResult, updateLeadData } = useFBStore();
  const { isOpen, setIsOpen } = useStore();

  const { addMessage } = useErrorStore();
  console.log(result);
  const send = () => {
    if (!result.length) {
      addMessage("error", "Ошибка при отправке");
      return;
    }

    sendToCrm(result);
    setResult([]);
  };

  return (
    <>
      {isOpen && (
        <div
          className="absolute w-[100%] h-[100%] bg-[#00000086] top-[40px] left-[0px]"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-10 h-[100%] w-[150vh] bg-white right-[-150vh] duration-300  ${
          isOpen ? "right-[0px] duration-300" : ""
        }`}
      >
        <div
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
            isResult={true}
            renderRow={(lead, className) => (
              <>
                <EditableItem
                  className={className}
                  id={lead.id}
                  field={"full_name"}
                  data={lead.full_name}
                  updatedLeads={updateLeadData}
                />
                <EditableItem
                  className={className}
                  id={lead.id}
                  field={"phone"}
                  data={lead.phone.replace(/\s+/g, "")}
                  updatedLeads={updateLeadData}
                />
                <EditableItem
                  className={className}
                  id={lead.id}
                  field={"email"}
                  data={lead.email}
                  updatedLeads={updateLeadData}
                />
                <EditableItem
                  className={className}
                  id={lead.id}
                  field={"description"}
                  data={lead.description}
                  updatedLeads={updateLeadData}
                />
                <EditableItem
                  className={className}
                  id={lead.id}
                  field={"country"}
                  data={lead.country.toUpperCase()}
                  updatedLeads={updateLeadData}
                />
                <EditableItem
                  className={className}
                  id={lead.id}
                  field={"source"}
                  data={lead.source}
                  updatedLeads={updateLeadData}
                />
                <EditableItem
                  className={className}
                  id={lead.id}
                  field={"user_id"}
                  data={lead.user_id}
                  updatedLeads={updateLeadData}
                />
                <EditableItem
                  className={className}
                  id={lead.id}
                  field={"user_id"}
                  data={`${lead.landing}/${lead.landing_name}`}
                  updatedLeads={updateLeadData}
                />
                <EditableItem
                  result={lead}
                  className={className}
                  id={lead.id}
                  field={"ip"}
                  data={lead.ip}
                  updatedLeads={updateLeadData}
                />
              </>
            )}
          />

          <button
            className="absolute z-index-5 left-[-85px] top-[41px] py-[9px] px-[11px] text-white bg-[var(--color-main-blue)] border-[1px] border-[var(--color-main-blue)] rotate-270  cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            Ready to Load
          </button>

          {isOpen && (
            <button
              className={`absolute z-index-5 left-[-81px] top-[170px] py-[9px] px-[11px] bg-white text-black border-[1px] border-black rotate-270  cursor-pointer`}
              onClick={() => send()}
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
