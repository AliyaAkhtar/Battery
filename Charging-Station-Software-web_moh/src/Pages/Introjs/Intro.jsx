// IntroTourManager.js
import introJs from "intro.js";
import "intro.js/introjs.css";
import "./introStyles.css";
const initializeIntroTour = () => {
  const intro = introJs();
  intro.setOptions({
    steps: [
        {
          intro: "Welcome to the tour!",
          tooltipClass: "custom-intro-tooltip",
        },
        {
          element: document.querySelector(".battery-info"), // Add the element where you want the image to appear
          intro:
            "This is the battery information. It includes both voltage and current:\n\nVoltage: Represents the voltage level of the battery in volts (V).\nCurrent: Represents the current flowing in or out of the battery in amperes (A).",
          tooltipClass: "custom-intro-tooltip",
          highlightClass: "custom-intro-highlight",
          overlayOpacity: 0.6,
        },

        {
          intro:
            "Welcome to the third stage of our guided tour, where we showcase the battery's charging status. In this section, you'll notice a softly pulsating, light green circle. This subtle animation indicates that the battery is currently in the process of charging, assuring you of its active status.",
          element: document.querySelector(".bulb"), // Add the element where you want the animation to appear
          tooltipClass: "custom-intro-tooltip",
         
          highlightClass: "custom-intro-highlight",
      
          overlayOpacity: 0.6,
        },
        // {
        //   title: "Farewell!",
        //   tooltipClass: "custom-intro-tooltip",
        //   highlightClass: "custom-intro-highlight",
        //   // intro: <img src={Step1} alt="" />,
        //   // intro: '<img src="https://images.unsplash.com/photo-1608096299210-db7e38487075?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" />'
        // },
        {
          element: document.querySelector( ".step-1"),
          intro: 'To begin, please click this button.',
          tooltipClass: "custom-intro-tooltip",
          highlightClass: "custom-intro-highlight",
        
        },
        {
          intro: "This concludes the battery dashboard demo tour.",
          tooltipClass: "custom-intro-tooltip",
        },
      
      ],
  });
  return intro;
};

export { initializeIntroTour };
