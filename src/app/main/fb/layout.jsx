"use client";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import MessageList from "@/app/components/ui/Message";
import useErrorStore from "@/store/useErrorStore";

const FacebookPage = ({ children }) => {
  const { type, message } = useErrorStore();

  return (
    <div className="flex-1 h-[100vh] flex flex-col m-[24px] p-[24px] bg-white overflow-y-auto overflow-x-hidden">
      <h2 className="text-[32px] mb-[36px] text-[var(--color-main-blue)] uppercase">
        <Breadcrumbs />
      </h2>
      <MessageList type={type} message={message} />

      {children}
    </div>
  );
};

export default FacebookPage;
