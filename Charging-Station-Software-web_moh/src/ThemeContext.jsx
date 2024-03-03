import React, { createContext, useState, useContext } from 'react';
import { createTheme } from '@mui/material/styles'; 

export const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  // Define the theme colors
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  console.log("Current theme:", theme); // Log the current theme

  // Determine which theme to use based on the state
  const selectedTheme = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme: selectedTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
