const FanpageItem = ({ text, click }) => {
  return (
    <div
      className={`px-[25px] py-[20px] text-[28px] bg-[var(--bg-main)] rounded-[6px] cursor-pointer text-center border-2 border-transparent hover:border-[var(--color-main-blue)]`}
      onClick={click}
    >
      {text}
    </div>
  );
};

export default FanpageItem;
