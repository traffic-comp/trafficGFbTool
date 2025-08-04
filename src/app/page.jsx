"use client";
import { login } from "@/fetch/user";
import useErrorStore from "@/store/useErrorStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Auth = () => {
  const { addMessage } = useErrorStore();
  const router = useRouter();
  const [creds, setCreds] = useState({
    login: "",
    password: "",
  });

  const sendForm = async (e) => {
    e.preventDefault();
    const data = await login(creds);

    if (data.type === "error") {
      return addMessage("error", data.message);
    }

    if (data.type === "success") {
      addMessage("success", data.message);
      localStorage.setItem("authToken", data.token);
      router.push("/main/fb/fanpages");

      return setCreds({
        login: "",
        password: "",
      });
    }
  };
  return (
    <div className="flex items-center justify-center h-screen w-full gap-8">
      <div className="flex flex-col items-center bg-[#D6D8E9] rounded-[30px] p-[24px] w-[310px]">
        <div className="flex items-center pb-[20px]">
          <img src="/assets/img/logo.png" className="w-[55px]" alt="" />
          <h1 className="font-bold text-[24px] text-white">TrafficG</h1>
        </div>
        <p className="text-center mb-[5px] text-[18px] font-bold">Войти</p>
        <form
          className="flex flex-col justify-center w-[100%]"
          onSubmit={sendForm}
        >
          <label className="pb-[10px]">
            <input
              type="text"
              placeholder="Login"
              className="py-[7px] px-[12px] rounded-[5px] border-1 border-[#63616C] w-[100%] outline-0"
              onChange={(e) => setCreds({ ...creds, login: e.target.value })}
              value={creds.login}
            />
          </label>
          <label className="pb-[10px]">
            <input
              type="password"
              placeholder="Password"
              className="py-[7px] px-[12px] rounded-[5px] border-1 border-[#63616C] w-[100%] outline-0"
              onChange={(e) => setCreds({ ...creds, password: e.target.value })}
              value={creds.password}
            />
          </label>
          <input
            type="submit"
            className="
          py-[7px] px-[12px]
          bg-[#0B69B7]
          text-white
          rounded-[5px]
          "
          />
        </form>
        <div className="flex gap-2 mt-[10px]">
          <a href="/register" className="cursor-pointer">
            Регистрация
          </a>
        </div>
      </div>
    </div>
  );
};

export default Auth;
