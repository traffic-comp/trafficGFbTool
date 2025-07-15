"use client";

import Navbar from "@/app/components/Navbar";
import Header from "@/app/components/Header";

function MainLayout({ children }) {
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
