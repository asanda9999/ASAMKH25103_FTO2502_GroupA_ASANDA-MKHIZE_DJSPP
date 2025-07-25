import { useContext } from "react";
import { SORT_OPTIONS } from "../context/podcastConstants";
import { PodcastContext } from "../context/PodcastContextInstance";
import styles from "../styles/SortSelect.module.css";

/**
 * Dropdown for choosing sort order.
 */
export default function SortSelect() {
  // Get current sort key and setter from context
  const { sortKey, setSortKey } = useContext(PodcastContext);

  return (
    <select
      className={styles.select}
      value={sortKey}
      onChange={(e) => setSortKey(e.target.value)}
    >
      {/* Render each sort option */}
      {SORT_OPTIONS.map((o) => (
        <option key={o.key} value={o.key}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
