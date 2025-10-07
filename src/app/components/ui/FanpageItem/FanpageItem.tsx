import { JSX } from "react";
import { FanpageItemProps } from "./FanpageItem.props";
import s from "./fanpageitem.module.css";

const FanpageItem = ({ text, click }: FanpageItemProps): JSX.Element => {
  return (
    <div className={s.item} onClick={click}>
      {text}
    </div>
  );
};

export default FanpageItem;
