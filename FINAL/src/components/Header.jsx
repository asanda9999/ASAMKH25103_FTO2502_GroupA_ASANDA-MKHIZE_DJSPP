import styles from "../styles/Header.module.css";
import "../styles/header.css";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useEffect, useState } from "react";

export default function Header() {
  const location = useLocation();
  // State to track if dark theme is active
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    // Observe body class changes to update dark mode state
    const checkDark = () => setIsDark(document.body.classList.contains("dark-theme"));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  return (
    <header className={styles.appHeader + " header-flex"}>
      <div className="header-left">
        <h1 className="header-title">🎙️ PodcastApp</h1>
      </div>
      <nav className="header-nav">
        {/* Highlight Home link if on home page, and apply dark mode if active */}
        <Link
          to="/"
          className={`header-link${location.pathname === "/" ? " active" : ""}${isDark ? " dark" : ""}`}
        >
          Home
        </Link>
        {/* Highlight Favourites link if on favourites page, and apply dark mode if active */}
        <Link
          to="/favourites"
          className={`header-link${location.pathname === "/favourites" ? " active" : ""}${isDark ? " dark" : ""}`}
        >
          Favourites
        </Link>
      </nav>
      {/* Theme toggle button */}
      <div className="header-theme-toggle">
        <ThemeToggle />
      </div>
    </header>
  );
}
