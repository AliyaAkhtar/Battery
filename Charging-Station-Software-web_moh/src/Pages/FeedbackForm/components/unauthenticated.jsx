import React from 'react';
import FailedAnimation from "../../../assets/feedbackfailed.json"
import Lottie from 'lottie-react';
import "./feedback.css"
import { ThemeContext } from "../../../ThemeContext";
import { Dialog, DialogContent } from "@mui/material";

const Unauthenticated = () => {
  return (
    <Dialog open={open} onClose={() => { }} fullWidth maxWidth="md">
        <DialogContent style={{ padding: '20px', overflowX: 'hidden' }}>
          <div className="tq-container" style={{
            width: "100%",
            height: "100%",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: darkMode ? "#383838" : "#ffffff",
          }}>
            {/* <Button
              style={{ width: "20px", fontSize: "25px", position: "absolute", top: "10px", left: "10px" }}
              onClick={toggleTheme}>
              <FaRegCircle />
            </Button> */}
            
            <Lottie animationData={FailedAnimation}
              style={{ width: "300px", height: "300px" }}
            //  loop={false}
            />
            <h1 style={{ color: darkMode ? "#ffffff" : "#000000" }}>Feedback Fails To Authenticate</h1>
          
          </div>
        </DialogContent>
      </Dialog>
  );
};

export default Unauthenticated;
