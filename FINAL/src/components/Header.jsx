import styles from "../styles/Header.module.css";
import "../styles/header.css";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useEffect, useState } from "react";

export default function Header() {
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
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
        <Link
          to="/"
          className={`header-link${location.pathname === "/" ? " active" : ""}${isDark ? " dark" : ""}`}
        >
          Home
        </Link>
        <Link
          to="/favourites"
          className={`header-link${location.pathname === "/favourites" ? " active" : ""}${isDark ? " dark" : ""}`}
        >
          Favourites
        </Link>
      </nav>
      <div className="header-theme-toggle">
        <ThemeToggle />
      </div>
    </header>
  );
}
