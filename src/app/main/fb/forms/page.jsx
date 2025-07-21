"use client";
import FormList from "@/app/components/FormList";
import RawLeadsSection from "@/app/components/RawLeadsSection";
import ResultLeadsPanel from "@/app/components/ResultLeadsPanel";
import Loader from "@/app/components/ui/Loader";
import { getLeadsByForm } from "@/fetch/fb";
import useErrorStore from "@/store/useErrorStore";
import useFBStore from "@/store/useFbStore";
import {
  extractAnswers,
  FIELD_KEYWORDS,
  getFieldValueByKeywords,
} from "@/utils/parseLeads";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FormsPage = () => {
  const { forms, setLeads, setActiveFormId, activeFormId, activeForm, leads } =
    useFBStore();

  const { addMessage } = useErrorStore();

  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 12;
  const totalPages = Math.ceil(leads.length / leadsPerPage);

  const currentLeads = leads.slice(
    (currentPage - 1) * leadsPerPage,
    currentPage * leadsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      console.log(currentLeads, "currentLeads");
      setCurrentPage(page);
    }
  };

  const showLead = async (formId) => {
    const rawLeads = await getLeadsByForm(formId, activeForm);
    setActiveFormId(formId);

    const leads = rawLeads.map((lead) => {
      return {
        ...lead,
        fullName: getFieldValueByKeywords(lead, FIELD_KEYWORDS.full_name) || "",
        email: getFieldValueByKeywords(lead, FIELD_KEYWORDS.email) || "",
        phone: getFieldValueByKeywords(lead, FIELD_KEYWORDS.phone) || "",
        answers: extractAnswers(lead), // строка
      };
    });

    if (leads.length) {
      addMessage("success", "Данные с формы получены");
      setLoading(false);
      setLeads(leads);
    } else {
      addMessage("error", "Ошибка получения данных");
    }
  };

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

      {!loading ? (
        <RawLeadsSection
          currentLeads={currentLeads}
          goToPage={goToPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
          source={"fb"}
        />
      ) : (
        <Loader isLoading={loading} />
      )}

      <ResultLeadsPanel />
    </>
  );
};

export default FormsPage;
