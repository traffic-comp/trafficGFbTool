import useErrorStore from "@/store/useErrorStore";
const { addMessage } = useErrorStore.getState();

export const createLink = async (
  userId: string
): Promise<{
  url: string;
} | null> => {
  const { addMessage } = useErrorStore.getState();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/link-monitor/create-link`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ userId }),
      }
    );

    if (!res.ok) {
      addMessage("error", "Ошибка при генерации ссылки");
    }
    const data = await res.json();

    return data;
  } catch (err) {
    if (err instanceof Error) {
      addMessage("error", err.message);
    } else {
      addMessage("error", String(err));
    }
    return null;
  }
};

export interface Link {
  _id: string;
  chat_id: string;
  link: string;
}

export const getLinks = async (
  chat_id: string
): Promise<{
  links: Link[];
  message: string;
} | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/link-monitor/get-links`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ chat_id }),
      }
    );

    if (!res.ok) {
      addMessage("error", "Ошибка при генерации ссылки");
    }
    const data = await res.json();

    return data;
  } catch (err) {
    if (err instanceof Error) {
      addMessage("error", err.message);
    } else {
      addMessage("error", String(err));
    }
    return null;
  }
};

export const addNewLink = async (
  link: string,
  chat_id: string
): Promise<{
  error: string | null;
  message: string;
  type: string;
  newLink: Link;
} | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/link-monitor/add-link`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ link, chat_id }),
      }
    );

    if (!res.ok) {
      addMessage("error", "Ошибка при создании ссылки");
    }

    const data = await res.json();

    return data;
  } catch (err) {
    if (err instanceof Error) {
      addMessage("error", err.message);
    } else {
      addMessage("error", String(err));
    }
    return null;
  }
};
export const deleteLink = async (
  _id: string
): Promise<{
  type: string;
  message: string;
} | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/link-monitor/delete`,
      {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ _id }),
      }
    );

    if (!res.ok) {
      addMessage("error", "Ошибка при удалении ссылки");
    }

    const data = await res.json();

    return data;
  } catch (err) {
    if (err instanceof Error) {
      addMessage("error", err.message);
    } else {
      addMessage("error", String(err));
    }
    return null;
  }
};
