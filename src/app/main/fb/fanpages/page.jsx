"use client";
import { useEffect, useState } from "react";
import { getLeadForms, getPages } from "@/fetch/fb";
import FanpagesList from "@/app/components/FanpagesList";
import useFBStore from "@/store/useFbStore";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/ui/Loader";

const FanpagesPage = () => {
  const { setPages, setForms, setActiveForm } = useFBStore();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fbPages = async () => {
    const fb_access_token = window.localStorage.getItem("fb_access_token");
    const pagesList = await getPages(fb_access_token);

    if (pagesList) {
      setPages(pagesList);
      setLoading(false);
    }
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
    <div className="flex-1 flex flex-col m-[24px] p-[24px] bg-white">
      <Loader isLoading={loading} />
      {!loading ? <FanpagesList onItemClick={showLeadsForm} /> : ""}
    </div>
  );
};

export default FanpagesPage;
