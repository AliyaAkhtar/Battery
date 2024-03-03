// SplashAnimation.js

import React from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/Splash.json";
import { useNavigate } from "react-router-dom";
import "./SplashAnimationStyles.css";

function SplashAnimation() {
  const navigate = useNavigate();

  const handleAnimationComplete = () => {
    navigate("/home");
  };

  return (
    <div className="splash-container">
      <Lottie
        animationData={animationData}
        className="splash-animation"
        onLoopComplete={handleAnimationComplete}
      />
    </div>
  );
}

export default SplashAnimation;
