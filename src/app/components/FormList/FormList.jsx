import s from "./formlist.module.scss";
const FormList = ({ data, click, renderRow }) => {
  return (
    <ul style={{ width: "100%" }} className={s.fbformList}>
      {data.map((item) => (
        <li
          key={item.id}
          className={s.fbformItem}
          onClick={click ? () => click(item) : undefined}
        >
          {renderRow(item)}
        </li>
      ))}
    </ul>
  );
};

export default FormList;
