"use client";
import Button from "@/app/components/ui/Button/Button";
import s from "./page.module.css";
import { Cookies } from "@/utils/cookies";
import { useEffect, useState } from "react";
import {
  addNewLink,
  createLink,
  deleteLink,
  getLinks,
  Link,
} from "@/fetch/linkMonitor";
import { getUserChatId } from "@/fetch/user";
import useErrorStore from "@/store/useErrorStore";

const Corn = () => {
  const cookie = Cookies;
  const [link, setLink] = useState<string>("");
  const [chatId, setChatId] = useState<string>("");
  const [links, setLinks] = useState<Link[]>([]);
  const [newLink, setNewLink] = useState<string>("");
  const { addMessage } = useErrorStore();

  const fetchCreateLink = async () => {
    const userId: string | null = cookie.get("userId");

    const result = await createLink(userId!);
    setLink(result!.url);
  };

  const fetchUserChatId = async () => {
    const userId: string | null = cookie.get("userId");

    const result = await getUserChatId(userId!);
    const chatId = result?.data?.chat_id;

    if (chatId) {
      setChatId(chatId);

      const fetchGetlinks = await getLinks(chatId);
      const result = fetchGetlinks?.links;

      if (result?.length) {
        setLinks(result);
      }
    }
  };

  useEffect(() => {
    fetchUserChatId();
  }, []);

  const newLinkEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await addNewLink(newLink, chatId);

    if (result?.type === "success") {
      addMessage(result?.type, result?.message);
      const newlinks = await getLinks(chatId);

      if (newlinks?.links) {
        setLinks(newlinks?.links);
      }
      setNewLink(""); // очистим поле после добавления
    }
  };

  const deleteOne = async (_id: string) => {
    const result = await deleteLink(_id);

    if (result?.type === "success") {
      addMessage(result?.type, result?.message);

      const newlinks = await getLinks(chatId);

      if (newlinks?.links) {
        setLinks(newlinks?.links);
      }
    }
  };

  return (
    <>
      {!chatId ? (
        <>
          <div className={s.btnWrapper}>
            <Button onClick={fetchCreateLink}>Connect to bot</Button>
            <Button onClick={fetchUserChatId}>
              <img
                src="/assets/icon/refresh.svg"
                width={15}
                height={15}
                alt="Refresh icon"
              />
            </Button>
          </div>

          <div className={s.linkWrapper}>
            {link ? (
              <a href={link} target="_blank">
                Link to Telegram
              </a>
            ) : null}
          </div>
        </>
      ) : (
        <>
          <form className={s.formContainer} onSubmit={newLinkEvent}>
            <input
              type="text"
              placeholder="Link"
              className={s.formInput}
              value={newLink}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewLink(e.target.value)
              }
            />
            <input type="submit" value="Submit" className={s.formSubmit} />
          </form>
          <div className={s.scrollContainer}>
            <ul className={s.linksList}>
              {links.length ? (
                links.map(({ link, _id }) => (
                  <li key={_id} className={s.linksItem}>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={s.linksUrl}
                    >
                      {link}
                    </a>
                    <button
                      className={s.linksDelete}
                      onClick={() => deleteOne(_id)}
                    >
                      ✕
                    </button>
                  </li>
                ))
              ) : (
                <li className={s.linksEmpty}>Not Found</li>
              )}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Corn;
