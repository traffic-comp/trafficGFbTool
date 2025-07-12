import s from "./formlistitem.module.scss";

const FormListItem = ({ click, form, activeFormId }) => {
  return (
    <li className={s.fbformItem} onClick={click}>
      <div
        className={`${s.formMarker} ${
          activeFormId === form.id ? s.formMarkerActive : ""
        }`}
      ></div>
      <div>{form.name}</div>
    </li>
  );
};

export default FormListItem;
