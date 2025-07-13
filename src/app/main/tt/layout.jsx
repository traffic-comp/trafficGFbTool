"use client";
import s from "@/app/main/fb/page.module.scss";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs/Breadcrumbs";

const FacebookPage = ({ children }) => {
  return (
    <div className={s.fanpages}>
      <h2 className={s.path}>
        <Breadcrumbs />
      </h2>

      {children}
    </div>
  );
};

export default FacebookPage;
