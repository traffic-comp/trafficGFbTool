import useFBStore from "@/store/useFbStore";
import LeadsList from "@/app/components/LeadsList";
import useStore from "@/store/useStore";
import { sendToCrm } from "@/fetch/crm";
import useErrorStore from "@/store/useErrorStore";
import EditableItem from "./EditableItem";

const ResultLeadsPanel = () => {
  const { result, setResult } = useFBStore();
  const { isOpen, setIsOpen } = useStore();

  const { addMessage } = useErrorStore();

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
        className={`fixed right-[-130vh] top-10 h-[100%] w-[150vh] bg-white right-[-150vh] duration-300  ${
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
                />
                {/* <span className={className}>{lead.full_name}</span> */}
                <EditableItem
                  className={className}
                  id={lead.id}
                  field={"phone"}
                  data={lead.phone.replace(/\s+/g, "")}
                />
                <EditableItem
                  className={className}
                  id={lead.id}
                  field={"email"}
                  data={lead.email}
                />
                <EditableItem
                  className={className}
                  id={lead.id}
                  field={"answers"}
                  data={lead.answers}
                />
                <EditableItem
                  className={className}
                  id={lead.id}
                  field={"country"}
                  data={lead.country.toUpperCase()}
                />
                <EditableItem
                  className={className}
                  id={lead.id}
                  field={"source"}
                  data={lead.source}
                />
                 <EditableItem
                  className={className}
                  id={lead.id}
                  field={"user_id"}
                  data={lead.user_id}
                />
                 <EditableItem
                  className={className}
                  id={lead.id}
                  field={"user_id"}
                  data={`${lead.landing}/${lead.landing_name}`}
                />
                 <EditableItem
                  result={lead}
                  className={className}
                  id={lead.id}
                  field={"ip"}
                  data={lead.ip}
                />
              </>
            )}
          />

          <button
            className="absolute z-index-5 left-[-84px] top-[41px] py-[9px] px-[11px] text-white bg-[var(--color-main-blue)] border-0 border-[1px] border-[var(--color-main-blue)] rotate-270  cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            Ready to Load
          </button>

          {isOpen && (
            <button
              className={`absolute z-index-5 left-[-80px] top-[170px] py-[9px] px-[11px] text-black bg-white border-0 border-[1px] border-black rotate-270  cursor-pointer`}
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
