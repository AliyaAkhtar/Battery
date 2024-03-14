import React, { useState, useEffect, useRef } from "react";
import "./battery.css";
import lowBatterySound from "../../assets/sound/lowBattery.mp3";
import CLickSound from "../../assets/sound/clicksound.mp3";
import MultiStepForm from "../../modal/multistepForm";
import socketIOClient from "socket.io-client";
import Lottie from "lottie-react";
import notWorkingAnimation from "../../assets/animation_lmoiiu3x.json";
import BatteryBox from "./batteryBox";
import EmptyBattery from "../../assets/animation_lmos5o97.json";
import { useAlert } from "react-alert";
import NotificationSound from "../../assets/sound/notification-sound.mp3";
const socket = socketIOClient("http://localhost:8080"); // Replace with your server's URL

function Battery({ id }) {
  const [chargeLevel, setChargeLevel] = useState(100);
  const [batteryStatus, setBatteryStatus] = useState("normal");
  const [voltage, setVoltage] = useState(100);
  const [current, setCurrent] = useState(100);
  const [bpi, setBpi] = useState();
  const [batteryPresent, setBatteryPresent] = useState("");
  const [batteryID, setBatteryID] = useState("");
  const [open, setOpen] = useState(false);
  const [isCharging, setIsCharging] = useState(true); // New state for charging status
  // const [speak, setSpeak] = useState(false);
  // Reference to Intro.js instance
  const intro = useRef(null);
  //-------sound------//
  const audio = new Audio();
  audio.src = NotificationSound;
 
//------------------//
  const bulbClass = current > 0 ? "bulb bulb-glow" : "bulb";
  // localStorage.setItem("Y_id", batteryID);
  const soundEnabled = JSON.parse(localStorage.getItem("soundEnabled"));
  // console.log(id);
  const [initialBatteryPresent, setInitialBatteryPresent] = useState("");
  const alert = useAlert();
  
  const sendLogDataToServer = async (logEntry) => {
    try {
      const response = await fetch("http://localhost:8080/log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logEntry),
      });

      if (!response.ok) {
        throw new Error(
          "Failed to send log entry to server. Status: ${response.status}"
        );
      }
      console.log("Log entry sent successfully");
    } catch (error) {
      console.error("Error sending log entry to server:", error);
    }
  };

  // useEffect(() => {
  //   const fetchInitialBatteryData = async () => {
  //     // Fetch initial battery presence data
  //     const storedBatteryPresent = localStorage.getItem("batteryPresent");
  //     if (storedBatteryPresent) {
  //       const batteryPresentObject = JSON.parse(storedBatteryPresent);
  //       setInitialBatteryPresent(batteryPresentObject[id].batteryPresent);
  //     }
  //   };
  //   // Fetch initial data when the component mounts
  //   fetchInitialBatteryData();
  //   // Continuous monitoring using setInterval
  //   const intervalId = setInterval(() => {
  //     const storedBatteryPresent = localStorage.getItem("batteryPresent");
  //     if (storedBatteryPresent) {
  //       const batteryPresentObject = JSON.parse(storedBatteryPresent);
  //       const currentBatteryPresent = batteryPresentObject[id].batteryPresent;

  //       // Use the functional form of setInitialBatteryPresent to get the most recent state
  //       setInitialBatteryPresent((prevInitialBatteryPresent) => {
  //         // Compare with initial data and take action if a change is detected
  //         const tokenCheck = localStorage.getItem("access_token");
  //         if (
  //           currentBatteryPresent !== prevInitialBatteryPresent &&
  //           !tokenCheck
  //         ) {
  //           const timestamp = Date.now();
  //           const currentDate = new Date(timestamp);

  //           // Format the date as a string
  //           const readableDate = currentDate.toLocaleString();

  //           // Log slot information to the console
  //           if (currentBatteryPresent) {
  //             const logMessage = `Battery inserted in slot ${id} at ${readableDate}`;
  //             console.log(logMessage);
  //             // swal("Warning", logMessage, "error");
  //             alert.show(logMessage);
  //             audio.play();
  //             // Accumulate log data
  //             const logEntry = {
  //               timestamp: timestamp,
  //               message: logMessage,
  //             };
  //             sendLogDataToServer(logEntry);
  //           } else {
  //             const logMessage = `Battery removed from slot ${id} at ${readableDate}`;
  //             console.log(logMessage);
  //             alert.show(logMessage);
  //             audio.play();
             
  //             // Accumulate log data
  //             const logEntry = {
  //               timestamp: timestamp,
  //               message: logMessage,
  //             };
  //             sendLogDataToServer(logEntry);
  //           }
  //         }

  //         // Return the currentBatteryPresent value for the next iteration
  //         return currentBatteryPresent;
  //       });
  //     }
  //   }, 5000); // Adjust the interval as needed (e.g., every 5 seconds)

  //   // Clear the interval when the component unmounts
  //   return () => clearInterval(intervalId);
  // }, [id, initialBatteryPresent]);
  
  const prevBatteryPresentRef = useRef({});
  useEffect(() => {
    const fetchInitialBatteryData = async () => {
        // Fetch initial battery presence data
        const storedBatteryPresent = localStorage.getItem("batteryPresent");
        if (storedBatteryPresent) {
            const batteryPresentObject = JSON.parse(storedBatteryPresent);
            setInitialBatteryPresent(batteryPresentObject[id].batteryPresent);
            // Store the initial battery present data in the ref
            prevBatteryPresentRef.current = { ...batteryPresentObject };
        }
    };

    // Fetch initial data when the component mounts
    fetchInitialBatteryData();

    const intervalId = setInterval(() => {
        const storedBatteryPresent = localStorage.getItem("batteryPresent");
        if (storedBatteryPresent) {
            const batteryPresentObject = JSON.parse(storedBatteryPresent);
            let changesDetected = false;

            const currentBatteryPresent = batteryPresentObject[id].batteryPresent;
            const prevBatteryPresent = prevBatteryPresentRef.current[id]?.batteryPresent;
                
                if (currentBatteryPresent !== prevBatteryPresent) {
                    const timestamp = Date.now();
                    const currentDate = new Date(timestamp);
                    const readableDate = currentDate.toLocaleString();

                    if (currentBatteryPresent) {
                      const logMessage = `Battery inserted in slot ${id} at ${readableDate}`;
                      console.log(logMessage);
                      alert.show(logMessage);
                      audio.play();
                      // Accumulate log data
                      const logEntry = {
                        timestamp: timestamp,
                        message: logMessage,
                      };
                      sendLogDataToServer(logEntry);
                      
                  } else {
                      const logMessage = `Battery removed from slot ${id} at ${readableDate}`;
                      console.log(logMessage);
                      alert.show(logMessage);
                      audio.play();
                      // Accumulate log data
                      const logEntry = {
                        timestamp: timestamp,
                        message: logMessage,
                      };
                      sendLogDataToServer(logEntry);
                  }
                  // Update the ref with the current battery present data
                  prevBatteryPresentRef.current[id] = { batteryPresent: currentBatteryPresent };
                  changesDetected = true;
                  // console.log(prevBatteryPresentRef); 
              }
         
      }
  }, 5000); // Adjust the interval as needed (e.g., every 5 seconds)

  // Clear the interval when the component unmounts
  return () => clearInterval(intervalId);
}, [id, initialBatteryPresent]);

  const handleOpen = () => {
    const storedBatteryPresent = localStorage.getItem("batteryPresent");
    const storedSOC = localStorage.getItem("SOC");

    if (storedBatteryPresent && storedSOC) {
      const batteryPresentObject = JSON.parse(storedBatteryPresent);
      const SOCObject = JSON.parse(storedSOC);
      // Get the data for the current battery ID
      const batteryData = {
        batteryPresent: batteryPresentObject[id].batteryPresent,
        voltage: batteryPresentObject[id].voltage,
        soc: SOCObject[id].soc,
        macAddress: batteryPresentObject[id].batteryID,
        slotID: batteryPresentObject[id].slotID,
        // Add other properties as needed
      };

      // Store the battery data locally
      // console.log("batteryData", batteryData);
      const jsonStringBatteryData = JSON.stringify(batteryData);
      localStorage.setItem("currentBatteryData", jsonStringBatteryData);
    }

    setOpen(true);
    // Check if the Intro.js instance is available (make sure it's appropriately defined and associated with the tour)
    if (intro && intro.current) {
      // Advance to the next step
      intro.current.nextStep();
    }
  };

  const handleClose = () => {
    setOpen(false);
    // const logMessage = `Battery already removed from slot ${id} at ${readableDate}`;
    // console.log(logMessage);
    // alert.show(logMessage);
  };

  const fetchBatteryData = async () => {
    // console.log(data)
    const storedBatteryPresent = localStorage.getItem("batteryPresent");
    // console.log("storedbattery", storedBatteryPresent);
    const storedSOC = localStorage.getItem("SOC");

    // console.log(battery);

    if (storedBatteryPresent && storedSOC) {
      // If data is available in local storage, parse and set it

      const batteryPresentObject = JSON.parse(storedBatteryPresent);
      const SOCObject = JSON.parse(storedSOC);

      // Set the state values from local storage
      setBatteryPresent(batteryPresentObject[id].batteryPresent);
      setVoltage(batteryPresentObject[id].voltage);
      setCurrent(SOCObject[id].soc);
      setBpi(batteryPresentObject[id].node);
      setBatteryStatus(batteryPresentObject[id].node);
      setChargeLevel(SOCObject[id].soc);
      setIsCharging(SOCObject[id].chargingStatus);
      setBatteryID(batteryPresentObject[id].batteryID);
    }

    socket.on("extractedParameters", (data) => {
      const battery = data[id];
      // console.log("battery", battery);

      if (battery) {
        if (battery.chargingStatus === "false") {
          setChargeLevel(0);
        }

        setChargeLevel(battery.soc);
        const SOCObject = {
          1: { soc: data[1].soc, batteryID: data[1].batteryID },
          2: { soc: data[2].soc, batteryID: data[2].batteryID },
          3: { soc: data[3].soc, batteryID: data[3].batteryID },
          4: { soc: data[4].soc, batteryID: data[4].batteryID },
          5: { soc: data[5].soc, batteryID: data[5].batteryID },
          6: { soc: data[6].soc, batteryID: data[6].batteryID },
          7: { soc: data[7].soc, batteryID: data[7].batteryID },
          8: { soc: data[8].soc, batteryID: data[8].batteryID },
          9: { soc: data[9].soc, batteryID: data[9].batteryID },
        };
        // Convert the object to a JSON string
        const jsonString = JSON.stringify(SOCObject);
        localStorage.setItem("SOC", jsonString);
        // console.log(battery.soc)

        setVoltage(battery.voltage);
        setCurrent(battery.current);
        setBpi(battery.bpi);
        setBatteryStatus(battery.nodeHealthOK);
        setBatteryPresent(battery.batteryPresent);
        const batteryPresentObject = {
          1: {
            batteryPresent: data[1].batteryPresent,
            soc: data[1].soc,
            voltage: data[1].voltage,
            node: data[1].nodeHealthOK,
            batteryID: data[1].batteryID,
            slotID: data[1].slotID,
          },
          2: {
            batteryPresent: data[2].batteryPresent,
            soc: data[2].soc,
            voltage: data[2].voltage,
            node: data[2].nodeHealthOK,
            batteryID: data[2].batteryID,
            slotID: data[2].slotID,
          },
          3: {
            batteryPresent: data[3].batteryPresent,
            soc: data[3].soc,
            voltage: data[3].voltage,
            node: data[3].nodeHealthOK,
            batteryID: data[3].batteryID,
            slotID: data[3].slotID,
          },
          4: {
            batteryPresent: data[4].batteryPresent,
            soc: data[4].soc,
            voltage: data[4].voltage,
            node: data[4].nodeHealthOK,
            batteryID: data[4].batteryID,
            slotID: data[4].slotID,
          },
          5: {
            batteryPresent: data[5].batteryPresent,
            soc: data[5].soc,
            voltage: data[5].voltage,
            node: data[5].nodeHealthOK,
            batteryID: data[5].batteryID,
            slotID: data[5].slotID,
          },
          6: {
            batteryPresent: data[6].batteryPresent,
            soc: data[6].soc,
            voltage: data[6].voltage,
            node: data[6].nodeHealthOK,
            batteryID: data[6].batteryID,
            slotID: data[6].slotID,
          },
          7: {
            batteryPresent: data[7].batteryPresent,
            soc: data[7].soc,
            voltage: data[7].voltage,
            node: data[7].nodeHealthOK,
            batteryID: data[7].batteryID,
            slotID: data[7].slotID,
          },
          8: {
            batteryPresent: data[8].batteryPresent,
            soc: data[8].soc,
            voltage: data[8].voltage,
            node: data[8].nodeHealthOK,
            batteryID: data[8].batteryID,
            slotID: data[8].slotID,
          },
          9: {
            batteryPresent: data[9].batteryPresent,
            soc: data[9].soc,
            voltage: data[9].voltage,
            node: data[9].nodeHealthOK,
            batteryID: data[9].batteryID,
            slotID: data[9].slotID,
          },
        };
        // Convert the object to a JSON string
        const jsonString_batteryPresent = JSON.stringify(batteryPresentObject);
        localStorage.setItem("batteryPresent", jsonString_batteryPresent);
        setIsCharging(battery.chargingStatus); // Set the charging status
      }
    });
  };

  useEffect(() => {
    fetchBatteryData();
    return () => {
      socket.off("extractedParameters");
    };
  }, [id]);

  const playLowBatterySound = () => {
    if (soundEnabled) {
      // console.log(soundEnabled)
      const audio = new Audio();
      audio.src = lowBatterySound;
      audio.play();
    }
  };

  const playClickSound = () => {
    if (soundEnabled) {
      const audio = new Audio();
      audio.src = CLickSound;
      audio.play();
    }
  };

  useEffect(() => {
    if (chargeLevel < 20 && soundEnabled) {
      playLowBatterySound();
    } else if (soundEnabled) {
      playClickSound();
    }
  }, [chargeLevel, soundEnabled]);

  if (batteryStatus === false) {
    return (
      <div className="battery">
        <div className="battery-info">
          <div>Battery {id}</div>
          {batteryStatus !== false && <div>Charge Level: {chargeLevel}%</div>}
          <div>Condition: {"Not Working"}</div>
          <div className="not-working">
            <Lottie
              animationData={notWorkingAnimation}
              // style={{ height: "153px", width: "250px" }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (batteryPresent === false) {
    return (
      <div className="battery">
        <div className="battery-info">
          <div>Battery {id}</div>
          {batteryPresent !== false && <div>Charge Level: {chargeLevel}%</div>}
          <div>Condition: {"Empty"}</div>
          <div className="empty">
            <Lottie animationData={EmptyBattery} />
          </div>
        </div>
      </div>
    );
  }

  let batteryColor;
  let status;

  if (chargeLevel < 20) {
    batteryColor = "#ff4f4f";
    status = "Low";
  } else if (chargeLevel >= 20 && chargeLevel <= 50) {
    batteryColor = "#ff9900";
    status = "Normal";
  } else {
    batteryColor = "#57cc57";
    status = "Good";
  }

  return (
    <div className="battery">
      <div className="battery-info">
        <div>Battery {id}</div>
        {batteryStatus !== "Not Working" && (
          <div className="parameters">
            Voltage ⚡️: {voltage ? voltage : null} Volts
          </div>
        )}
        <div className="parameters">Current ⚡️: {current} Amps</div>
      </div>
      <BatteryBox />
      <div className="battery-bar">
        {batteryStatus !== false && (
          <div
            className="battery-fill"
            style={{ width: `${chargeLevel}%`, backgroundColor: batteryColor }}
          ></div>
        )}
        <div className="battery-percentage">{chargeLevel}%</div>
      </div>
      <div className="controls">
        <div className="proceed">
          <button className="step-1" onClick={handleOpen} disabled={false}>
            Proceed
          </button>
       
          {/* <DemoButton startTour={startTour} /> */}
          {/* <DropdownMenu startTour={startTour} /> */}
        </div>
        <MultiStepForm open={open} handleClose={handleClose} />
        <div className={bulbClass}></div>
      </div>
      {/* Pass the startTour function as a prop */}

    </div>
  );
}

export default Battery;
