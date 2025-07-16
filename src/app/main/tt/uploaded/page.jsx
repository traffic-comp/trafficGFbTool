"use client";
import FormList from "@/app/components/FormList";
import RawLeadsSection from "@/app/components/RawLeadsSection";
import ResultLeadsPanel from "@/app/components/ResultLeadsPanel";
import useErrorStore from "@/store/useErrorStore";
import useFBStore from "@/store/useFbStore";
import useTTStore from "@/store/useTTStore";
import { useState } from "react";

const Uploaded = () => {
  const { leads } = useFBStore();

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

  return (
    <>
      <RawLeadsSection
        currentLeads={currentLeads}
        goToPage={goToPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
        source={"tt"}
      />
      <ResultLeadsPanel />
    </>
  );
};

export default Uploaded;
