import { useState, useEffect, useContext } from "react";
import { PodcastContext } from "../context/PodcastContextInstance";
import styles from "../styles/SearchBar.module.css";

/**
 * Search input with debounced update.
 */
export default function SearchBar() {
  // Get search value and setter from context
  const { search, setSearch } = useContext(PodcastContext);
  // Local state for the input value
  const [value, setValue] = useState(search);

  // Debounce input (300ms) to avoid rapid updates.
  useEffect(() => {
    const id = setTimeout(() => setSearch(value), 300);
    return () => clearTimeout(id);
  }, [value,setSearch]);

  return (
    <input
      type="search"
      placeholder="Search podcasts"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={styles.searchInput}
    />
  );
}
