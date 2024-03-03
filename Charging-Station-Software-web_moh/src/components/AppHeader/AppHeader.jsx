import React from "react";
import { AppBar, Container, Toolbar } from "@mui/material";
import logo from "/src/assets/logo.jpg";
import "./AppHeaderStyles.css"; // Import the CSS file

const AppHeader = () => {
  return (
    <AppBar className="appBar" style={{ background: "#252134" }}>
      <Container>
        <Toolbar>
          <img src={logo} alt="Logo" className={"logo"} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AppHeader;
