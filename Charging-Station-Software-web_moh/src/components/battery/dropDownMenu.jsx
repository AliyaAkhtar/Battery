// DropdownMenu.js
import React, { useEffect, useRef } from "react";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import "./dropDownMenu.css"; // Import custom styles for the dropdown menu
import { FeedbackRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import { initializeIntroTour } from "../../Pages/Introjs/Intro"; // Import the intro tour manager



function DropdownMenu({ isOpen, soundEnabled, toggleSound }) {
  const intro = useRef(null);

  useEffect(() => {
    intro.current = initializeIntroTour(); // Initialize the intro tour

    // Other useEffect logic...
  }, []);

  const startTour = () => {
    if (intro.current) {
      intro.current.start();
    }
  };

  const handleOptionClick = (option) => {
    // Handle the selected option here
    console.log("Selected option:", option);
  };

  const navigate = useNavigate();
  const handleFeedbackBtnClick = () => {
    navigate("/feedback");
  };

  return isOpen ? (
    <div className="dropdown-menu">
      <div className="dropdown-header">Sound Options</div>
      <div className="dropdown-item sound-toggle" onClick={toggleSound}>
        <div className="icon-container">
          {soundEnabled ? <VolumeUpIcon /> : <VolumeOffIcon />}
        </div>
        <div className="label-container">
          Sound {soundEnabled ? "On" : "Off"}
        </div>
        <div className="dropdown-divider" />
      </div>
      <div
        className="dropdown-item-feedback"
        onClick={() => handleFeedbackBtnClick()}
      >
        <div className="feedback-icon">
          <FeedbackRounded />
        </div>
        <div className="dropdown-item1">Feedback</div>
      </div>
      <div className="dropdown-item-feedback" onClick={startTour}>
        <div className="feedback-icon">
          <WavingHandIcon />
        </div>
        <div className="dropdown-item1">Demo</div>
      </div>
      <div className="dropdown-divider"></div>
      <div
        className="dropdown-item"
        onClick={() => handleOptionClick("Option 2")}
      >
        Option 2
      </div>
      <div
        className="dropdown-item"
        onClick={() => handleOptionClick("Option 3")}
      >
        Option 3
      </div>
      {/* Add more options as needed */}
    </div>
  ) : null;
}
export default DropdownMenu;
