"use client";
import FormList from "@/app/components/FormList";
import RawLeadsSection from "@/app/components/RawLeadsSection";
import ResultLeadsPanel from "@/app/components/ResultLeadsPanel";
import { getLeadsByForm } from "@/fetch/fb";
import useErrorStore from "@/store/useErrorStore";
import useFBStore from "@/store/useFbStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FormsPage = () => {
  const { forms, setLeads, setActiveFormId, activeFormId, activeForm, leads } =
    useFBStore();

  const { addMessage } = useErrorStore();

  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 12;
  const totalPages = Math.ceil(leads.length / leadsPerPage);

  const currentLeads = leads.slice(
    (currentPage - 1) * leadsPerPage,
    currentPage * leadsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const showLead = async (formId) => {
    const rawLeads = await getLeadsByForm(formId, activeForm);

    setActiveFormId(formId);

    const leads = rawLeads.map((lead) => {
      const data = Object.fromEntries(
        lead.field_data.map(({ name, values }) => [name, values?.[0] ?? ""])
      );

      const knownFields = ["full name", "email", "phone"];
      const answers = Object.entries(data)
        .filter(([key]) => !knownFields.includes(key))
        .map(([key, value]) => `${key}: ${value}`)
        .join(". ");

      return {
        ...lead,
        fullName: data["full name"] || "",
        email: data["email"] || "",
        phone: data["phone"] || "",
        answers, // строка
      };
    });

    if (leads.length) {
      addMessage('success','Данные с формы получены')
      setLeads(leads);
    }
    else{
      addMessage('error','Ошибка получения данных')
    }
  };

  useEffect(() => {
    if (forms.length === 0) {
      router.push("/main/fb/fanpages");
    }
  }, [forms, router]);

  return (
    <>
      <FormList
        data={forms}
        click={showLead}
        renderRow={(form) => (
          <>
            <div
              className={`w-[15px] h-[15px] border-[2px] border-black rounded-[50%] ${
                activeFormId === form.id
                  ? "w-[15px] h-[15px] border-[2px] border-[var(--color-main-blue)] rounded-[50%] bg-[#0b6ab771] "
                  : ""
              }`}
            ></div>
            <div>{form.name}</div>
          </>
        )}
      />
      <RawLeadsSection
        currentLeads={currentLeads}
        goToPage={goToPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
        source={"fb"}
      />
      <ResultLeadsPanel />
    </>
  );
};

export default FormsPage;
