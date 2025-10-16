import useErrorStore from "@/store/useErrorStore";
const { addMessage } = useErrorStore.getState();

export const registrate = async (dto: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/user/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(dto),
  });
  const data = await res.json();

  return data;
};

export const login = async (dto: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/user/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(dto),
  });
  const data = await res.json();

  return data;
};

export const chekAuth = async (token: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/user/checkAuth`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

export const getUserChatId = async (
  userId: string
): Promise<{
  data: {
    _id: string;
    chat_id: string;
  };
  message: string;
} | null> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/user/getUser`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    if (!res.ok) {
      addMessage("error", "Пользователь не подключен к боту");
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
