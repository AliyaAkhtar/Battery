import React from "react";
import { Typography } from "@mui/material";

import "./FooterStyles.css"; // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <Typography variant="body1">
        &copy; {new Date().getFullYear()} AIM Motors
      </Typography>
    </footer>
  );
};

export default Footer;
