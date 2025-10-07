import { JSX } from "react";
import type { FormListProps } from "./FormList.props";
import s from "./formlist.module.css";

function FormList<T>({
  data,
  click,
  renderRow,
  ...props
}: FormListProps<T>): JSX.Element {
  return (
    <ul style={{ width: "100%" }} {...props} className={s.formList}>
      {data?.map((item) => (
        <li
          key={(item as any).id}
          className={s.formListItem}
          onClick={click ? () => click((item as any).id) : undefined}
        >
          {renderRow(item)}
        </li>
      ))}
    </ul>
  );
}

export default FormList;
