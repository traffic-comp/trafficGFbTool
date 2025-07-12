import FanpageListItem from "../ui/FormListItem/FormListItem";
import s from "./formlist.module.scss";
const FormList = ({ forms, click, activeFormId }) => {
  return (
    <ul style={{ width: "100%" }} className={s.fbformList}>
      {forms.map((form) => (
        <FanpageListItem
          form={form}
          key={form.id}
          click={() => click(form)}
          activeFormId={activeFormId}
        />
      ))}
    </ul>
  );
};

export default FormList;
