"use client";
import RawLeadsSection from "@/app/components/RawLeadsSection/RawLeadsSection";
import ResultLeadsPanel from "@/app/components/ResultLeadsPanel/ResultLeadsPanel";
import useFBStore from "@/store/useFbStore";
import { JSX, useState } from "react";

const Uploaded = (): JSX.Element => {
  const { leads } = useFBStore();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const leadsPerPage = 12;
  const totalPages = Math.ceil(leads.length / leadsPerPage);

  const currentLeads = leads.slice(
    (currentPage - 1) * leadsPerPage,
    currentPage * leadsPerPage
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <RawLeadsSection
        currentLeads={currentLeads}
        goToPage={goToPage}
        currentPage={currentPage}
        totalPages={totalPages}
        source={"tt"}
      />
      <ResultLeadsPanel />
    </>
  );
};

export default Uploaded;
