import LeadsList from "@/app/components/LeadsList/LeadsList";
import OfferForm from "@/app/components/OfferForm/OfferForm";
import TablePagination from "@/app/components/ui/TablePagination";
import useFBStore from "@/store/useFbStore";
import type { RawLeadsSectionProps } from "./RawLeadsSection.props";

import s from "./rawleadsection.module.css";
import { JSX } from "react";
import formatDate from "@/utils/formatDate";

const RawLeadsSection = ({
  currentLeads,
  goToPage,
  currentPage,
  totalPages,
  source,
}: RawLeadsSectionProps): JSX.Element => {
  const { leads } = useFBStore();

  return (
    <>
      {leads.length > 0 && (
        <div className={s.container}>
          <OfferForm source={source} />
          <TablePagination
            goToPage={goToPage}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      )}

      {currentLeads.length > 0 && (
        <LeadsList
          headers={[
            "Full Name",
            "Phone",
            "Email",
            "Geo",
            "Answers",
            "Created time",
          ]}
          className="pb-56"
          data={currentLeads}
          renderRow={(lead, className) => (
            <>
              <span className={className}>{lead.full_name}</span>
              <span className={className}>{lead.phone}</span>
              <span className={className}>{lead.email}</span>
              <span className={className}>{lead.country}</span>
              <span className={className}>{lead.description}</span>
              <span className={className}>{formatDate(lead.created_time)}</span>
            </>
          )}
        />
      )}
    </>
  );
};

export default RawLeadsSection;
