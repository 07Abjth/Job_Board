import React, { useEffect, useState } from 'react';

export const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Get theme from localStorage on first render
    return localStorage.getItem("theme") === "dark";
  });

  // Update HTML attribute and save to localStorage when theme changes
  useEffect(() => {
    const theme = isDarkMode ? "dark" : "light";
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div>
      <label className="swap swap-rotate">
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={toggleTheme}
        />
        {/* sun icon */}
        <svg className="swap-off h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M5.64 17.66l1.41 1.41L12 14.12l4.95 4.95 1.41-1.41L13.41 12l4.95-4.95-1.41-1.41L12 9.88 7.05 4.93 5.64 6.34 10.59 12z" />
        </svg>
        {/* moon icon */}
        <svg className="swap-on h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12.74 2.46a9 9 0 0010.8 10.8A10 10 0 0112.74 2.46z" />
        </svg>
      </label>
    </div>
  );
};
