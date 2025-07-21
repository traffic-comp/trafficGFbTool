import LeadsList from "@/app/components/LeadsList";
import OfferForm from "@/app/components/OfferForm";
import TablePagination from "@/app/components/ui/TablePagination";
import useFBStore from "@/store/useFbStore";

const RawLeadsSection = ({
  currentLeads = [],
  goToPage,
  setCurrentPage,
  currentPage,
  totalPages,
  source,
}) => {
  const { leads } = useFBStore();
  return (
    <>
      {leads.length > 0 && (
        <div className="flex justify-between mb-[32px]">
          <OfferForm source={source} />
          <TablePagination
            goToPage={goToPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      )}

      {currentLeads.length > 0 && (
        <LeadsList
          headers={["Full Name", "Phone", "Email", "Answers"]}
          data={currentLeads}
          renderRow={(lead, className) => (
            <>
              <span className={className}>{lead.fullName}</span>
              <span className={className}>{lead.phone}</span>
              <span className={className}>{lead.email}</span>
              <span className={className}>{lead.answers}</span>
            </>
          )}
        />
      )}
    </>
  );
};

export default RawLeadsSection;
