import useFBStore from "@/store/useFbStore";
import LeadsList from "@/app/components/LeadsList";
import useStore from "@/store/useStore";
import { sendToCrm } from "@/fetch/crm";
import Message from "./ui/Message";
import useErrorStore from "@/store/useErrorStore";

const ResultLeadsPanel = () => {
  const { result } = useFBStore();
  const { isOpen, setIsOpen } = useStore();

  const { addMessage } = useErrorStore();

  const send = () => {
    if (!result.length) {
      addMessage("error", "Ошибка при отправке");
      return;
    }

    sendToCrm(result);
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
                <span className={className}>{lead.full_name}</span>
                <span className={className}>{lead.phone}</span>
                <span className={className}>{lead.email}</span>
                <span className={className}>{lead.answers}</span>
                <span className={className}>{lead.country}</span>
                <span className={className}>{lead.source}</span>
                <span className={className}>{lead.user_id}</span>
                <span className={className}>
                  {lead.landing}/{lead.landing_name}
                </span>
                <span className={className}>{lead.ip}</span>
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
