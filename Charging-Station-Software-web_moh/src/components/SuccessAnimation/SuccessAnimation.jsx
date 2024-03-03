import React from "react";
import { Grid, Paper } from "@mui/material";
import Lottie from "lottie-react";
import animationData from "../../assets/success.json"; // Import your Lottie animation JSON file

function SuccessAnimation() {
  const object = JSON.parse(localStorage.getItem("currentBatteryData") || "0");
  // const id = JSON.parse(object);
  console.log(object.slotID);
  return (
    <Grid container className="successUI">
      {/* Left */}
      <Grid item xs={12} md={6}>
        <Paper
          elevation={3}
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            // alignItems: "center",
            justifyContent: "center",
            boxShadow: "none", // Remove the box shadow
          }}
        >
          <Lottie animationData={animationData} height={300} width={300} />
        </Paper>
      </Grid>

      {/* Right */}
      <Grid item xs={12} md={6}>
        <Paper
          elevation={3}
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "none", // Remove the box shadow
          }}
        >
          <div>
            <h2 style={{ fontSize: "32px", margin: "10%" }}>
              You may take your battery from slot No {object.slotID} . Thank
              you.
            </h2>

            {/* <div style={{ color: "#15A3C7", margin: "10%" }}></div> */}
            <p
              className="urduText"
              style={{ fontSize: "20px", margin: "10%", fontWeight: "bold" }}
            >
              {" "}
              آپ اپنی بیٹری خانہ نمبر {object.slotID} سے لے سکتے ہیں۔ شکریہ
            </p>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default SuccessAnimation;
