"use client";

import useErrorStore from "@/store/useErrorStore";

export const getPages = async (accessToken) => {
  const { addMessage } = useErrorStore.getState();
  try {
    const res = await fetch(
      `https://graph.facebook.com/v19.0/me/accounts?access_token=${accessToken}`
    );

    if (res.status === 400) {
      addMessage("error", "Для получения страниц, нужно подключить fb");
      return;
    }

    const { data } = await res.json();
    return data;
  } catch (error) {
    throw new Error("Ошибка при получении страниц:", error);
  }
};

export const getLeadForms = async (pageId, pageAccessToken) => {
  try {
    const res = await fetch(
      `https://graph.facebook.com/v19.0/${pageId}/leadgen_forms?access_token=${pageAccessToken}`
    );

    if (res.status === 400) {
      addMessage("error", "Для получения форм, нужно подключить fb");
      return;
    }

    const { data } = await res.json();

    return data;
  } catch (error) {
    throw new Error("Ошибка при получении лид-форм:", error);
  }
};

export const getPagesWithTokens = async () => {
  try {
    const res = await fetch(
      `https://graph.facebook.com/v19.0/me/accounts?access_token=${accessToken}`
    );

    if (res.status === 400) {
      return;
    }

    const data = await res.json();
  } catch (error) {
    console.error("Ошибка при получении страниц с токенами:", error);
  }
};

export const getLeadsByForm = async (formId, access_token) => {
  try {
    const res = await fetch(
      `https://graph.facebook.com/v19.0/${formId}/leads?access_token=${access_token}&fields=field_data,created_time`
    );
    const { data } = await res.json();

    if (res.status === 400) {
      addMessage("error", "Для получения лидов из форму, нужно подключить fb");
      return;
    }

    return data;
  } catch (error) {
    throw new Error(`Ошибка при получении лидов для формы ${formId}:`, error);
  }
};

export const getLeadsForAllForms = async (forms) => {
  for (const form of forms) {
    const leads = await getLeadsByForm(form.id);

    if (leads?.length) {
      for (const lead of leads) {
        console.log(lead.field_data);
      }
    }
  }
};

export const subscribeLeadForm = async (pageId, pageAccessToken) => {
  console.log(pageId, pageAccessToken);
  try {
    const res = await fetch(
      `https://graph.facebook.com/v19.0/${pageId}/subscribed_apps`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          access_token: pageAccessToken,
          subscribed_fields: "leadgen",
        }),
      }
    );

    const data = await res.json();
    console.log("✅ Проверка подписка:", data);
    return data;
  } catch (err) {
    console.error("❌ Ошибка подписки:", err);
  }
};
export const checkSubscribePages = async (pageId, pageAccessToken) => {
  console.log(pageId, pageAccessToken);
  try {
    const res = await fetch(
      `https://graph.facebook.com/v19.0/${pageId}/subscribed_apps`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          access_token: pageAccessToken,
          subscribed_fields: "leadgen",
        }),
      }
    );

    const data = await res.json();
    console.log("✅ Подписка успешно:", data);
  } catch (err) {
    console.error("❌ Ошибка подписки:", err);
  }
};