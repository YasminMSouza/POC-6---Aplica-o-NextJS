import { useState, useEffect } from "react";
import styles from "./darkMode.module.css";
import { BsBrightnessHigh } from "react-icons/bs";
import { BsFillMoonStarsFill } from "react-icons/bs";
export default function DarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
}
