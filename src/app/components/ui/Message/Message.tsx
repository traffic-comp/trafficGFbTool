"use client";
import useErrorStore from "@/store/useErrorStore";
import { JSX, useEffect, useState } from "react";
import { MessageProps } from "./Message.props";
import s from "./message.module.css";

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

const Message = ({
  id,
  type,
  message,
  onRemove,
}: MessageProps): JSX.Element => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive(false);
      setTimeout(() => {
        onRemove(Number(id));
      }, 300);
    }, 4000);

    return () => clearTimeout(timer);
  }, [id, onRemove]);

  return (
    <div
      className={s.message}
      style={{
        background: colors[type as keyof typeof colors],
        opacity: active ? 1 : 0,
        transform: `translateY(${active ? "0" : "-10px"})`,
      }}
      onClick={() => {
        setActive(false);
        setTimeout(() => onRemove(Number(id)), 300);
      }}
    >
      <img src={icons[type as keyof typeof icons]} className={s.icon} alt="" />
      <p className={s.text}>{message}</p>
    </div>
  );
};

const MessageList = () => {
  const { messages, removeMessage } = useErrorStore();

  return (
    <div className={s.messageList}>
      {messages.map((msg: MessageProps) => (
        <Message key={msg.id} {...msg} onRemove={removeMessage} />
      ))}
    </div>
  );
};

export default MessageList;
