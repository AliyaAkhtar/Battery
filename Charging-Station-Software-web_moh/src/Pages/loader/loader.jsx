import React from 'react';
import LoaderAnimation from "../../assets/loader.json"
import Lottie from 'lottie-react';

const Loader = () => {
  return (
    <div className="loader">
      <div className="spinner"></div>
     <Lottie animationData={LoaderAnimation}
       style={{ width: "300px", height: "300px" }}
     />
    </div>
  );
};

export default Loader;
