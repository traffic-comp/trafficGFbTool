"use client";
import useErrorStore from "@/store/useErrorStore";
import { useEffect, useState } from "react";

const icons = {
  error: "/assets/icon/error.png",
  success: "/assets/icon/success.png",
  warning: "/assets/icon/warning.png",
};

const colors = {
  error: "#D83D3D",
  success: "#25B66E",
  warning: "#D8A43D",
};

const Message = ({ id, type, message, onRemove }) => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive(false);
      setTimeout(() => {
        onRemove(id);
      }, 300);
    }, 4000); // автозакрытие через 4 секунды

    return () => clearTimeout(timer);
  }, [id, onRemove]);

  return (
    <div
      className={`flex items-center gap-[6px] p-[6px] rounded-[6px] text-white font-semibold duration-300 cursor-pointer shadow-md transition-all`}
      style={{
        background: colors[type],
        opacity: active ? 1 : 0,
        transform: `translateY(${active ? "0" : "-10px"})`,
      }}
      onClick={() => {
        setActive(false);
        setTimeout(() => onRemove(id), 300);
      }}
    >
      <img src={icons[type]} className="w-[21px] h-auto" alt="" />
      <p className="text-[14px]">{message}</p>
    </div>
  );
};

const MessageList = () => {
  const { messages, removeMessage } = useErrorStore();

  return (
    <div className="fixed right-[20px] bottom-[20px] z-50 flex flex-col gap-[10px] max-w-[300px]">
      {messages.map((msg) => (
        <Message key={msg.id} {...msg} onRemove={removeMessage} />
      ))}
    </div>
  );
};

export default MessageList;
