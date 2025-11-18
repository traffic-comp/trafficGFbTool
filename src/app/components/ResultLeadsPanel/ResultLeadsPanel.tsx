import useFBStore from "@/store/useFbStore";
import LeadsList from "@/app/components/LeadsList/LeadsList";
import useStore from "@/store/useStore";
import { sendToCrm } from "@/fetch/crm";
import useErrorStore from "@/store/useErrorStore";
import EditableItem from "../EditableItem/EditableItem";
import { useState } from "react";
import formatDate from "@/utils/formatDate";
import { uploadLeads } from "@/fetch/duplicateLeads";
import { Lead } from "@/interfaces/global";
import { ResultLeadsPanelProps } from "./ResultLeadsPanel.props";
import s from "./resultleadspanel.module.css";
import Button from "../ui/Button/Button";

const ResultLeadsPanel = ({ ...props }: ResultLeadsPanelProps) => {
  const { result, setResult, updateLeadData, deleteLead } = useFBStore();
  const { isOpen, setIsOpen } = useStore();
  const { addMessage } = useErrorStore();
  const [checked, setChecked] = useState<number[]>([]);

  const send = async () => {
    if (!result.length) {
      addMessage("error", "Ошибка при отправке");
      return;
    }
    const prepared = result
      .map((lead: Lead) => ({
        ...lead,
        description: lead.description ? lead.description : "",
      }))
      .filter((lead: Lead) => !lead.isDuplicate);

    sendToCrm(prepared);
    await saveAsDubles();
    setResult([]);
  };

  const changeCheckbox = (id: number) => {
    if (checked.includes(id)) {
      setChecked(checked.filter((i) => i !== id));
      return;
    }
    setChecked(() => [...checked, id]);
  };

  const deleteLeads = () => {
    if (checked.length) {
      deleteLead(checked);
    }
    setChecked([]);
  };

  const selectedLeads = () => {
    if (checked.length) {
      const filtered = result.filter((lead: Lead) => checked.includes(lead.id));
      sendToCrm(
        filtered.map((lead: Lead) => ({
          ...lead,
          description: lead.description ? lead.description : "",
        }))
      );
      setResult([]);
    }
  };

  const saveAsDubles = async () => {
    const data = await uploadLeads(result);
    if (data.error) {
      console.log(data.error);
      return addMessage("error", "Ошибка при сохранении дублей");
    }
    addMessage(
      "success",
      `${data.message}. ${data.saved ? "Сохраненно " + data.saved : ""}`
    );

    setResult([]);
  };
  return (
    <>
      {isOpen && (
        <div className={s.overlay} onClick={() => setIsOpen(false)}></div>
      )}

      <div className={`${s.panel} ${isOpen ? s.panelOpen : ""}`} {...props}>
        <div className={s.scroll}>
          <LeadsList
            headers={[
              "Full Name",
              "Email",
              "Phone",
              "Answers",
              "Country",
              "Source",
              "User_id",
              "Landing",
              "UTM",
              "IP",
              "Created time",
              "",
            ]}
            data={result}
            renderRow={(lead: Lead, className: string) => (
              <>
                <EditableItem
                  className={className}
                  itemId={lead.id}
                  field={"full_name"}
                  data={lead.full_name}
                  updatedLeads={updateLeadData}
                />
                <EditableItem
                  className={className}
                  itemId={lead.id}
                  field={"phone"}
                  data={"*********"}
                  updatedLeads={updateLeadData}
                />
                <EditableItem
                  className={className}
                  itemId={lead.id}
                  field={"email"}
                  data={lead.email}
                  updatedLeads={updateLeadData}
                />
                <EditableItem
                  className={className}
                  itemId={lead.id}
                  field={"description"}
                  data={lead.description}
                  updatedLeads={updateLeadData}
                />
                <EditableItem
                  className={className}
                  itemId={lead.id}
                  field={"country"}
                  data={lead.country.toUpperCase()}
                  updatedLeads={updateLeadData}
                />
                <EditableItem
                  className={className}
                  itemId={lead.id}
                  field={"source"}
                  data={lead.source}
                  updatedLeads={updateLeadData}
                />
                <EditableItem
                  className={className}
                  itemId={lead.id}
                  field={"user_id"}
                  data={lead.user_id}
                  updatedLeads={updateLeadData}
                />
                <EditableItem
                  className={className}
                  itemId={lead.id}
                  field={"landing"}
                  data={`${lead.landing}`}
                  updatedLeads={updateLeadData}
                />
                <EditableItem
                  className={className}
                  itemId={lead.id}
                  field={"landing_name"}
                  data={`${lead.landing_name}`}
                  updatedLeads={updateLeadData}
                />
                <EditableItem
                  className={className}
                  itemId={lead.id}
                  field={"ip"}
                  data={lead.ip}
                  updatedLeads={updateLeadData}
                />
                <EditableItem
                  className={className}
                  itemId={lead.id}
                  field={"ip"}
                  data={formatDate(lead.created_time)}
                  updatedLeads={updateLeadData}
                />
                <input
                  type="checkbox"
                  checked={checked.includes(lead.id)}
                  onChange={() => changeCheckbox(lead.id)}
                />
              </>
            )}
          />

          <Button
            type="squere"
            posX="-92px"
            posY="46px"
            blue={true}
            rotate={true}
            onClick={() => setIsOpen(!isOpen)}
          >
            Ready to Load
          </Button>

          {isOpen && (
            <Button
              type="squere"
              posX="-87px"
              posY="185px"
              rotate={true}
              onClick={() => send()}
            >
              Send to CRM
            </Button>
          )}
          {isOpen && (
            <Button
              type="squere"
              posX="-93px"
              posY="326px"
              rotate={true}
              onClick={() => saveAsDubles()}
            >
              Save as dubles
            </Button>
          )}

          {checked.length > 0 && isOpen && (
            <Button
              type="squere"
              posX="-90px"
              posY="470px"
              rotate={true}
              onClick={() => selectedLeads()}
            >
              Send selected
            </Button>
          )}

          {checked.length > 0 && isOpen && (
            <Button
              type="squere"
              posX="-61px"
              posY="582px"
              rotate={true}
              red={true}
              onClick={deleteLeads}
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default ResultLeadsPanel;
