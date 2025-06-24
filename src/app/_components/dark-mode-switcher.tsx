"use client";

import { Moon, Orbit, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function DarkModeSwitcher() {
  const [darkMode, setDarkMode] = useState("system");

  // listen to system dark mode changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches ? "dark" : "light");
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    const storedMode = window.localStorage.getItem("darkMode");
    if (storedMode) {
      setDarkMode(storedMode);
    } else {
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setDarkMode(prefersDarkMode ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (darkMode === "system") {
      document.documentElement.classList.remove("dark");
    } else if (darkMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <button
      className="bg-accent flex flex-col items-center text-inverted transition-colors p-2 rounded-md cursor-pointer hover:bg-primary/80"
      onClick={() => {
        const nextMode =
          darkMode === "system"
            ? "dark"
            : darkMode === "dark"
            ? "light"
            : "system";

        setDarkMode(nextMode);
      }}
    >
      {darkMode === "system" ? (
        <Orbit />
      ) : darkMode === "dark" ? (
        <Moon />
      ) : (
        <Sun />
      )}
      <span className="text-xs mt-2">
        {darkMode === "system"
          ? "System"
          : darkMode === "dark"
          ? "Dark"
          : "Light"}
      </span>
    </button>
  );
}
