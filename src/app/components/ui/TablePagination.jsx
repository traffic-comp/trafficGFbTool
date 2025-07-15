"use client";
import BtnArrow from "./BtnArrow";

const Pagination = ({ currentPage, totalPages, goToPage }) => {
  return (
    <div className="flex items-center gap-[12px] text-[var(--color-second-gray)]">
      <p className="text-[var(--color-second-gray)]">
        Page {currentPage} of {totalPages}
      </p>

      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex justify-center items-center px-[15px] py-[17px] bg-white shadow-[0_1px_1px_0_#0000000f]"
      >
        <BtnArrow fill={currentPage === 1 ? "#71717A" : "#0B69B7"} />
      </button>

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex justify-center items-center px-[15px] py-[17px] bg-white shadow-[0_1px_1px_0_#0000000f]`}
      >
        <BtnArrow
          className="rotate-180"
          fill={currentPage === totalPages ? "#71717A" : "#0B69B7"}
        />
      </button>
    </div>
  );
};

export default Pagination;
