import React from "react";
import styles from "../styles/Pagination.module.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.pagination}>
      <div
        className={styles.navBtn}
        onClick={() => onPageChange(currentPage - 1)}
        style={{ visibility: currentPage === 1 ? "hidden" : "visible" }}
      >
        Назад
      </div>
      {pages.map((page) => (
        <div
          key={page}
          className={`${styles.pageBtn} ${
            currentPage === page ? styles.active : ""
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </div>
      ))}
      <div
        className={styles.navBtn}
        onClick={() => onPageChange(currentPage + 1)}
        style={{
          visibility: currentPage === totalPages ? "hidden" : "visible",
        }}
      >
        Вперед
      </div>
    </div>
  );
};

export default Pagination;