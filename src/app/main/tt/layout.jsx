"use client";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import MessageList from "@/app/components/ui/Message";

const FacebookPage = ({ children }) => {
  return (
    <div className="flex-1 flex flex-col m-[24px] p-[24px] bg-white">
      <h2 className="text-[32px] mb-[36px] text-[var(--color-main-blue)] uppercase">
        <Breadcrumbs />
      </h2>
      <MessageList/>


      {children}
    </div>
  );
};

export default FacebookPage;
