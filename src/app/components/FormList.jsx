const FormList = ({ data, click, renderRow }) => {
  return (
    <ul style={{ width: "100%" }} className="formList mb-[36px] max-h-[77px] overflow-y-auto">
      {data?.map((item) => (
        <li
          key={item.id}
          className="flex items-center w-[100%] gap-[10px] p-[20px] border-b-[1px] border-black cursor-pointer"
          onClick={click ? () => click(item.id) : undefined}
        >
          {renderRow(item)}
        </li>
      ))}
    </ul>
  );
};

export default FormList;
