"use client";

import Navbar from "@/app/components/Navbar";
import Header from "@/app/components/Header";
import { useEffect } from "react";
import { chekAuth } from "@/fetch/user";
import { useRouter } from "next/navigation";

function MainLayout({ children }) {
  const router = useRouter();

  const isAuth = async () => {
    const authToken = localStorage.getItem("authToken");
    const { isAuth, id } = await chekAuth(authToken);
    localStorage.setItem("userId", id);
    
    if (!isAuth) {
      return router.push("/");
    }
  };

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <>
      <main className="grid grid-cols-[15%_auto]">
        <Navbar />
        <div className="h-[100vh] overflow-hidden flex flex-col relative">
          <Header />
          {children}
        </div>
      </main>
    </>
  );
}

export default MainLayout;
