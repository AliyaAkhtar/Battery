// BatteryDashboard.js
import React, { useState, useContext } from 'react';
import { BatteryComponent } from './index.js';
import { FaRegCircle } from "react-icons/fa";
import { Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { ThemeContext } from "../../ThemeContext.jsx";
import DropdownMenu from '../../components/battery/dropDownMenu.jsx'; // Import the dropdown menu component
import '../../components/battery/battery.css';
// import MenuOpenIcon from '@mui/icons-material/MenuOpen';
// import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';

function BatteryDashboard(startTour) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    localStorage.setItem('soundEnabled', !soundEnabled);
  };


  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="Battery">
        <nav className="navbar">
          <h1 className="navbar-title">Battery Dashboard</h1>
          <div className="icon-button">
            <Button
              style={{ width: "20px", fontSize: "25px" }}
              onClick={toggleTheme}>
              <FaRegCircle />
            </Button>
          {/* <button
            className={`dropdown-toggle${isDropdownOpen ? ' open' : ''}`}
            onClick={toggleDropdown}
          >
              {isDropdownOpen? <CloseFullscreenIcon /> : <MenuOpenIcon />}
     
          </button>
          <DropdownMenu
            isOpen={isDropdownOpen}
            soundEnabled={soundEnabled}
            toggleSound={toggleSound}
            startTour={startTour}
          
          /> */}
        </div>
      </nav>
      <div className="container" >
          <BatteryComponent />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default BatteryDashboard;
