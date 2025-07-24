import { useCallback, useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.body.classList.contains("dark-theme"));
  }, []);

  const handleThemeToggle = useCallback(() => {
    if (document.body.classList.contains("dark-theme")) {
      document.body.classList.remove("dark-theme");
      setIsDark(false);
    } else {
      document.body.classList.add("dark-theme");
      setIsDark(true);
    }
  }, []);

  return (
    <button
      className={`theme-toggle${isDark ? " theme-toggle--reversed" : ""}`}
      type="button"
      title="Toggle theme"
      aria-label="Toggle theme"
      style={{ marginRight: 24, background: 'none', border: 'none', cursor: 'pointer' }}
      onClick={handleThemeToggle}
    >
      {isDark ? (
        // Sun SVG for light mode
        <svg width="1.8em" height="1.8em" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="5"/>
          <g>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </g>
        </svg>
      ) : (
        // Your "within" SVG for dark mode
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="theme-toggle__within"
          height="1.8em"
          width="1.8em"
          viewBox="0 0 32 32"
          fill="currentColor"
        >
          <clipPath id="theme-toggle__within__clip">
            <path d="M0 0h32v32h-32ZM6 16A1 1 0 0026 16 1 1 0 006 16" />
          </clipPath>
          <g clipPath="url(#theme-toggle__within__clip)">
            <path d="M30.7 21.3 27.1 16l3.7-5.3c.4-.5.1-1.3-.6-1.4l-6.3-1.1-1.1-6.3c-.1-.6-.8-.9-1.4-.6L16 5l-5.4-3.7c-.5-.4-1.3-.1-1.4.6l-1 6.3-6.4 1.1c-.6.1-.9.9-.6 1.3L4.9 16l-3.7 5.3c-.4.5-.1 1.3.6 1.4l6.3 1.1 1.1 6.3c.1.6.8.9 1.4.6l5.3-3.7 5.3 3.7c.5.4 1.3.1 1.4-.6l1.1-6.3 6.3-1.1c.8-.1 1.1-.8.7-1.4zM16 25.1c-5.1 0-9.1-4.1-9.1-9.1 0-5.1 4.1-9.1 9.1-9.1s9.1 4.1 9.1 9.1c0 5.1-4 9.1-9.1 9.1z" />
          </g>
          <path
            className="theme-toggle__within__circle"
            d="M16 7.7c-4.6 0-8.2 3.7-8.2 8.2s3.6 8.4 8.2 8.4 8.2-3.7 8.2-8.2-3.6-8.4-8.2-8.4zm0 14.4c-3.4 0-6.1-2.9-6.1-6.2s2.7-6.1 6.1-6.1c3.4 0 6.1 2.9 6.1 6.2s-2.7 6.1-6.1 6.1z"
          />
          <path
            className="theme-toggle__within__inner"
            d="M16 9.5c-3.6 0-6.4 2.9-6.4 6.4s2.8 6.5 6.4 6.5 6.4-2.9 6.4-6.4-2.8-6.5-6.4-6.5z"
          />
        </svg>
      )}
    </button>
  );
} 