"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    const token = hash.split("=")[1];

    if (token) {
      localStorage.setItem("fb_access_token", token);
      router.push("/main");
    } else {
      console.error("Access token not found");
      router.push("/");
    }
  }, []);

  return <div>Авторизация через Facebook...</div>;
}
