"use client";

import { Lead } from "@/interfaces/global";
import useErrorStore from "@/store/useErrorStore";
const { addMessage } = useErrorStore.getState();

export const getPages = async (accessToken: string) => {
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
    if (error instanceof Error) {
      console.error("Ошибка при получении страниц:", error.message);
    } else {
      console.error("Ошибка при получении страниц:", error);
    }
    return null;
  }
};

export const getLeadForms = async (pageId: number, pageAccessToken: string) => {
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
    if (error instanceof Error) {
      console.error("Ошибка при получении лид-форм:", error);
    } else {
      console.error("Ошибка при получении лид-форм:", error);
    }
    return null;
  }
};

export const getPagesWithTokens = async (accessToken: string) => {
  try {
    const res = await fetch(
      `https://graph.facebook.com/v19.0/me/accounts?access_token=${accessToken}`
    );

    if (res.status === 400) {
      return;
    }

    const data = await res.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Ошибка при получении страниц с токенами:", error);
    } else {
      console.error("Ошибка при получении страниц с токенами:", error);
    }
    return null;
  }
};

export const getLeadsByForm = async (formId: number, access_token: string) => {
  try {
    let url = `https://graph.facebook.com/v19.0/${formId}/leads?access_token=${access_token}&fields=field_data,created_time`;
    let allLeads: any[] = [];

    while (url) {
      const res = await fetch(url);
      const { data, paging } = await res.json();

      if (res.status === 400) {
        addMessage(
          "error",
          "Для получения лидов из формы, нужно подключить fb"
        );
        return [];
      }

      if (data && data.length > 0) {
        allLeads = allLeads.concat(data);
      }

      url = paging?.next || null;
    }
    return allLeads;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Ошибка при получении лидов для формы ${formId}:`, error);
    } else {
      console.error(`Ошибка при получении лидов для формы ${formId}:`, error);
    }
    return null;
  }
};

export const subscribeLeadForm = async (
  pageId: number,
  pageAccessToken: string
) => {
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
  } catch (error) {
    if (error instanceof Error) {
      console.error(`❌ Ошибка подписки:`, error);
    } else {
      console.error(`❌ Ошибка подписки:`, error);
    }
    return null;
  }
};

export const fbSpend = async (fb_access_token: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/fb/fbspend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fb_access_token,
      }),
    });

    const { data } = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Ошибка получения данных о затратах:`, error.message);
    } else {
      console.error(`Ошибка получения данных о затратах:`, error);
    }
    return null;
  }
};
