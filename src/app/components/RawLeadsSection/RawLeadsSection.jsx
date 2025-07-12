import LeadsList from "@/app/components/LeadsList/LeadsList";
import OfferForm from "@/app/components/OfferForm/OfferForm";
import TablePagination from "@/app/components/ui/TablePagination/TablePagination";
import s from "./rawleadssection.module.scss";
import useFBStore from "@/store/useFbStore";

const RawLeadsSection = ({
  currentLeads = [],
  goToPage,
  setCurrentPage,
  currentPage,
  totalPages,
  source,
}) => {
  const { leads, setIsOpen } = useFBStore();

  return (
    <>
      {leads.length > 0 && (
        <div className={s.formContainer}>
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
          renderRow={(lead) => (
            <>
              <span>{lead.fullName}</span>
              <span>{lead.phone}</span>
              <span>{lead.email}</span>
              <span>{lead.answers}</span>
            </>
          )}
        />
      )}
    </>
  );
};

export default RawLeadsSection;
