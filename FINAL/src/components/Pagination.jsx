import { useContext } from "react";
import { PodcastContext } from "../context/PodcastContextInstance";
import styles from "../styles/Pagination.module.css";

/**
 * Numeric pagination bar.
 */
export default function Pagination() {
  // Get current page, setter, and total pages from context
  const { page, setPage, totalPages } = useContext(PodcastContext);

  if (totalPages <= 1) return null;

  /**
   * Build page list.
   */
  // Create an array of page numbers
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.paginationWrapper}>
      {/* Render a button for each page */}
      {pages.map((p) => (
        <button
          key={p}
          className={`${styles.pageButton} ${p === page ? styles.active : ""}`}
          onClick={() => setPage(p)}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
