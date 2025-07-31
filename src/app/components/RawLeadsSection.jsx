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
  const { leads } = useFBStore();

  console.log(leads)
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
              />
              <EditableItem
                className={className}
                id={lead.id}
                field={"phone"}
                data={lead.phone}
              />
              <EditableItem
                className={className}
                id={lead.id}
                field={"email"}
                data={lead.email}
              />
              <EditableItem
                className={className}
                id={lead.id}
                field={"geo"}
                data={lead.geo}
              />
              <EditableItem
                className={className}
                id={lead.id}
                field={"answers"}
                data={lead.answers}
              />
            </>
          )}
        />
      )}
    </>
  );
};

export default RawLeadsSection;
