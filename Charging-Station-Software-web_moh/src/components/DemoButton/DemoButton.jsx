// DemoButton.js
import React from "react";

function DemoButton({ startTour }) {
    const handleStartTourClick = () => {
        if (typeof startTour === "function") {
          startTour();
        } else {
          console.error("startTour is not a function");
        }
      };
  return (
    <button onClick={handleStartTourClick}>Demo</button>
  );
}

export default DemoButton;
