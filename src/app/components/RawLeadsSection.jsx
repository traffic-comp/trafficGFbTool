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
  const { leads,updateLeadData } = useFBStore();

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
              <EditableItem
                className={className}
                id={lead.id}
                field={"full_name"}
                data={lead.full_name}
                  updatedLeads={updateLeadData}
              />
              <EditableItem
                className={className}
                id={lead.id}
                field={"phone"}
                data={lead.phone}
                updatedLeads={updateLeadData}
              />
              <EditableItem
                className={className}
                id={lead.id}
                field={"email"}
                data={lead.email}
                updatedLeads={updateLeadData}
              />
              <EditableItem
                className={className}
                id={lead.id}
                field={"geo"}
                data={lead.geo}
                updatedLeads={updateLeadData}
              />
              <EditableItem
                className={className}
                id={lead.id}
                field={"description"}
                data={lead.description}
                updatedLeads={updateLeadData}
              />
            </>
          )}
        />
      )}
    </>
  );
};

export default RawLeadsSection;
