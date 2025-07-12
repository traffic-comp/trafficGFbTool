"use client";
import { useEffect } from "react";
import { getLeadForms, getPages } from "@/fetch/fb";
import s from "./fanpages.module.scss";
import FanpagesList from "@/app/components/FanpagesList/FanpagesList";
import useFBStore from "@/store/useFbStore";
import { useRouter } from "next/navigation";

const FanpagesPage = () => {
  const { setPages, pages, setForms, setActiveForm } = useFBStore();
  const router = useRouter();

  const fbPages = async () => {
    const fb_access_token = window.localStorage.getItem("fb_access_token");
    const pagesList = await getPages(fb_access_token);
    setPages(pagesList);
  };

  const showLeadsForm = async (pageId, pageAccessToken) => {
    const forms = await getLeadForms(pageId, pageAccessToken);
    setActiveForm(pageAccessToken);
    setForms(forms);
    router.push("/main/fb/forms");
  };

  useEffect(() => {
    fbPages();
  }, []);

  return (
    <div className={s.fanpages}>
      <FanpagesList  onItemClick={showLeadsForm} />
    </div>
  );
};

export default FanpagesPage;
