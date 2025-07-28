"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Callback() {
  const router = useRouter();

  const setLongLivedToken = async (fb_token) => {
    const authToken = await localStorage.getItem("authToken");
    console.log(authToken);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/fb/getLongLivedToken`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ fb_token, authToken }),
      }
    );
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    async function getNewToken() {
      const hash = window.location.hash.substring(1); // удаляем #
      const params = new URLSearchParams(hash);
      const token = params.get("access_token");
      const d = await setLongLivedToken(token);

      if (d.access_token) {
        localStorage.setItem("fb_access_token", d.access_token);
        router.push("/main/fb/fanpages");
      } else {
        console.error("Access token not found");
        router.push("/");
      }
    }
    getNewToken();
  }, []);

  return <div>Авторизация через Facebook...</div>;
}
