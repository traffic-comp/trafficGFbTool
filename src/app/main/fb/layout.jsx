"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import useFBStore from "@/store/useFbStore";
import s from "@/app/main/fb/page.module.scss";

const FacebookPage = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  const { tabs, currentTab, setCurrentTab, addTab, cutTabsBefore } =
    useFBStore();

  const currentPathTab = pathname.split("/")[3];

  useEffect(() => {
    if (!currentPathTab) return;
    addTab(currentPathTab);
    setCurrentTab(currentPathTab);
  }, [pathname]);

  const changeTab = (tab) => {
    if (tab !== currentTab) {
      cutTabsBefore(tab);
      router.push(`/main/fb/${tab}`);
    }
  };

  return (
    <div className={s.fanpages}>
      <h2 className={s.path}>
        {tabs.map((tab, i) => (
          <span key={tab} onClick={() => changeTab(tab)}>
            {i === 0 ? "" : " - "}
            {tab}
          </span>
        ))}
      </h2>

      {children}
    </div>
  );
};

export default FacebookPage;
