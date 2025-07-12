import s from "./fanpage.module.scss";

const FanpageItem = ({ isActive, text, click }) => {
  return (
    <div className={`${s.fanpage} ${isActive ? s.active : ""}`} onClick={click}>
      {text}
    </div>
  );
};

export default FanpageItem;
