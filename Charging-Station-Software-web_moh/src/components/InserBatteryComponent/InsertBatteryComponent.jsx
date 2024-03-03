import React, { useState, useEffect } from "react";

import { Grid, Paper, TextField, Typography } from "@mui/material";
import Lottie from "lottie-react";
import animationData from "../../assets/InsertBattery.json"; // Import your Lottie animation JSON file
import animationBattery from "../../assets/loadingBattery.json";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { handleClear } from "../localStorageUtils/localStorageUtils";
function InsertBattery({ formData, e_Msg_2 }) {
  const [X_battery_id, setX_battery_id] = useState(formData.X_battery_id);
  const [X_voltage, setX_voltage] = useState(formData.X_voltage);
  const [X_SOC, setX_SOC] = useState(formData.X_SOC);
  const [Y_SOC, setY_SOC] = useState(formData.Y_SOC);
  // const [sanityMsg, setsanityMsg]= useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [timer, setTimer] = useState(180);
  const [data_1, setData_1] = useState({});
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const navigate = useNavigate(); // Hook from React Router
  const [sanityCheck, setsanityCheck] = useState("");
  const [sanityCheckAttempts, setsanityCheckAttempts] = useState(0);
  localStorage.setItem("batteryReturnedID", X_battery_id);
  localStorage.setItem("batteryReturnedSOC", X_SOC);

  useEffect(() => {
    let countdown;
    let timeout;

    if (isTimerRunning && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      timeout = setTimeout(() => {
        handleClear();
        navigate("/home");
        clearInterval(countdown);
        swal("Error", "Battery Was not Inserted in alloted time.", "error");
      }, timer * 1000);
    } else if (timer <= 0) {
      localStorage.clear();
      navigate("/home");
    }

    return () => {
      clearInterval(countdown);
      clearTimeout(timeout);
    };
  }, [timer, isTimerRunning, navigate]);
  // Retrieve the JSON string from localStorage
  const jsonStringForBatteryPresence = localStorage.getItem("batteryPresent");
  const battery_Inserted = localStorage.getItem("battery_Inserted") || "true";
  const battery_boolean = JSON.parse(battery_Inserted);

  // Parse the JSON string into an array of objects
  const data = JSON.parse(jsonStringForBatteryPresence);

  let firstFalseBatteryId = null;
  // let sanitycount = 0;
  // Iterate over the object using a for...in loop
  function findFirstFalseBattery() {
    for (const id in data) {
      if (data.hasOwnProperty(id)) {
        const batteryObject = data[id];
        if (
          batteryObject.batteryPresent === false &&
          batteryObject.node === true
        ) {
          firstFalseBatteryId = id;
          // setsanityCheckAttempts(sanitycount);
          break; // Exit the loop after finding the first false battery
        }
      }
    }
  }

  // Function to perform actions when the battery fails the sanity check
  function handleSanityCheckFailure() {
    setsanityCheck(
      `${e_Msg_2} Kindly Remove your Battery From Slot ${firstFalseBattery} and insert it again in Slot ${firstFalseBattery}`
    );
    if (firstFalseBattery === firstFalseBatteryId && sanityCheckAttempts < 3) {
      setsanityCheck("");
      setsanityCheckAttempts((prevAttempts) => prevAttempts + 1);
      console.log("to see attempt", sanityCheckAttempts);
      localStorage.setItem("battery_Inserted", true);
      setIsLoading(true);
      setIsTimerRunning(true);
      setTimer(180);

      console.log("to see", firstFalseBatteryId);
    } else if (sanityCheckAttempts == 3) {
      console.log("Exceeded maximum attempts for sanity check failures.");
      handleClear();
      navigate("/home");
      swal(
        "Error",
        "Exceeded maximum attempts for sanity check failures.",
        "error"
      );
    }
    // Additional actions after the timeout if needed
  }
  function Restart() {
    if (firstFalseBattery === firstFalseBatteryId && sanityCheckAttempts < 3) {
      setsanityCheckAttempts((prevAttempts) => prevAttempts + 1);
      console.log("to see attempt", sanityCheckAttempts);
      localStorage.setItem("battery_Inserted", true);
      setIsLoading(true);
      setIsTimerRunning(true);
      setTimer(180);

      console.log("to see", firstFalseBatteryId);
    } else if (sanityCheckAttempts == 3) {
      console.log("Exceeded maximum attempts for sanity check failures.");
      handleClear();
      navigate("/home");
      swal(
        "Error",
        "Exceeded maximum attempts for sanity check failures.",
        "error"
      );
    }
    // Additional actions after the timeout if needed
  }
  findFirstFalseBattery();
  const [firstFalseBattery, setfirstFalseBatteryId] =
    useState(firstFalseBatteryId);
  localStorage.setItem("FalseBatteryId", firstFalseBattery);
  useEffect(() => {
    const fetchDataFromLocalStorage = () => {
      // Retrieve data from local storage
      const storedData =
        JSON.parse(localStorage.getItem("batteryPresent")) || {};

      // Retrieve data for the specific ID
      const specificData = storedData[firstFalseBattery];
      // console.log("specific Data", specificData.soc);
      if (
        (specificData && specificData.batteryPresent) ||
        isLoading == false ||
        battery_boolean == false
      ) {
        // Perform the action when batteryPresent becomes true
        localStorage.setItem("battery_Inserted", false);
        setIsLoading(false);
        setIsTimerRunning(false);
        setX_battery_id(specificData.batteryID);
        setX_voltage(specificData.voltage);
        setX_SOC(specificData.soc);
        setY_SOC(Y_SOC);
        console.log(`Battery is present for ID ${firstFalseBattery}!`);
        // setsanityMsg(e_Msg_2);

        if (
          e_Msg_2 === "The battery failed Sanity Check" &&
          isLoading === false
        ) {
          handleSanityCheckFailure();
          // setsanityCheck(null);
          localStorage.setItem("battery_Inserted", true);

          console.log("in if");
        } else {
          console.log("in else");
          Restart();
        }

        // Initial run to find the first false battery

        // Set the data in the state for rendering or further use
        setData_1(specificData);
      }
    };

    fetchDataFromLocalStorage();
  }, [firstFalseBatteryId, e_Msg_2, isLoading]);

  return (
    <Grid container className="batteryUI">
      {/* Left */}
      <Grid item xs={12} md={6}>
        <Paper
          elevation={3}
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            boxShadow: "none",
          }}
        >
          <Lottie
            animationData={animationData}
            height={500}
            width={500}
            loop={false}
          />
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
            boxShadow: "none",
          }}
        >
          {isLoading ? (
            <div style={{ marginLeft: "30px" }}>
              <h2 style={{ fontSize: "32px", margin: "10%" }}>
                Checking Your Battery
              </h2>
              <p style={{ fontSize: "20px", margin: "10%" }}>
                Please Insert your Battery in Slot No {firstFalseBattery}
              </p>
              <p
                className="urduText"
                style={{
                  fontSize: "15git add px",
                  margin: "10%",
                  marginTop: "-20px",
                  fontWeight: "bold",
                }}
              >
                براہ کرم اپنی بیٹری خانہ نمبر {firstFalseBattery} میں ڈالیں۔
              </p>
              <Lottie
                animationData={animationBattery}
                style={{
                  height: "100px",
                  width: "100px",
                  marginLeft: "80px",
                }}
              />
              <p style={{ fontSize: "20px", margin: "10%", marginTop: "0px" }}>
                {`Time remaining: ${timer}s`}
              </p>
            </div>
          ) : (
            <div>
              <h2 style={{ fontSize: "25px", margin: "10%" }}>
                Battery has been inserted Successfully Attempt{" "}
                {sanityCheckAttempts}/3
              </h2>
              <Grid container spacing={2}>
                {/* <Grid 
                    xs={12}
                    sm={10}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: "50px",
                    }}
                  >
                    
                    <Typography variant="body1" style={{ marginLeft: "0px" }}>
                      <strong>Inserted Battery id:</strong> {X_battery_id}
                    </Typography> 
                  </Grid> */}

                <Grid
                  item
                  xs={12}
                  sm={11}
                  style={{ textAlign: "left", paddingLeft: "50px" }}
                >
                  <Typography variant="body1" style={{ marginLeft: "0px" }}>
                    <strong>Inserted Battery voltage:</strong> {X_voltage} volts
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={11}
                  style={{ textAlign: "left", paddingLeft: "50px" }}
                >
                  <Typography variant="body1" style={{ marginLeft: "0px" }}>
                    <strong>Inserted Battery SOC:</strong> {X_SOC} %
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={11}
                  style={{ textAlign: "left", paddingLeft: "50px" }}
                >
                  <Typography variant="body1" style={{ marginLeft: "0px" }}>
                    <strong>Issued Battery SOC:</strong> {Y_SOC} %
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={11}
                  style={{ textAlign: "left", paddingLeft: "50px" }}
                >
                  {e_Msg_2 && ( // Conditionally render the error message
                    <Typography
                      variant="body"
                      color="error"
                      style={{ marginLeft: "0px" }}
                    >
                      {sanityCheck}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </div>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default InsertBattery;
