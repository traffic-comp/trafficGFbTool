"use client";
import BtnArrow from "../BtnArrow";
import s from "./tablepagination.module.scss";

const Pagination = ({ currentPage, totalPages, goToPage }) => {
  return (
    <div className={s.pagination}>
      <p className={s.paginationPageText}>
        Page {currentPage} of {totalPages}
      </p>

      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={s.paginationBtn}
      >
        <BtnArrow fill={currentPage === 1 ? "#71717A" : "#0B69B7"} />
      </button>

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${s.paginationBtn} ${s.paginationBtnRight}`}
      >
        <BtnArrow fill={currentPage === totalPages ? "#71717A" : "#0B69B7"} />
      </button>
    </div>
  );
};

export default Pagination;
