import LeadsList from "@/app/components/LeadsList";
import OfferForm from "@/app/components/OfferForm";
import TablePagination from "@/app/components/ui/TablePagination";
import useFBStore from "@/store/useFbStore";
import EditableItem from "./EditableItem";

const RawLeadsSection = ({
  currentLeads = [],
  goToPage,
  setCurrentPage,
  currentPage,
  totalPages,
  source,
}) => {
  const { leads, updateLeadData } = useFBStore();

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
          headers={["Full Name", "Phone", "Email", "Geo", "Answers"]}
          data={leads}
          renderRow={(lead, className) => (
            <>
              <span className={className}>{lead.full_name}</span>
              <span className={className}>{lead.phone}</span>
              <span className={className}>{lead.email}</span>
              <span className={className}>{lead.geo}</span>
              <span className={className}>{lead.description}</span>
            </>
          )}
        />
      )}
    </>
  );
};

export default RawLeadsSection;
