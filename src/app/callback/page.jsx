"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash.substring(1); // удаляем #
    const params = new URLSearchParams(hash);
    const token = params.get("access_token");

    if (token) {
      localStorage.setItem("fb_access_token", token);
      router.push("/main/fb/fanpages");
    } else {
      console.error("Access token not found");
      router.push("/");
    }
  }, []);

  return <div>Авторизация через Facebook...</div>;
}
