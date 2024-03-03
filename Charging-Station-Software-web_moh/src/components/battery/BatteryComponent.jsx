import React, { useState, useEffect } from "react";
import Battery from "./battery";
import socketIOClient from "socket.io-client";
import Loader from "../../Pages/loader/loader";
import swal from "sweetalert";
const socket = socketIOClient("http://localhost:8080"); // Replace with your server's URL

function BatteryComponent() {
  const [isLoading, setIsLoading] = useState(true);
  const [backendData, setBackendData] = useState(null);

  const handleRefreshClick = () => {
    window.location.reload();
  };
  useEffect(() => {
    const fetchData = async () => {
      const localStorageData = localStorage.getItem("batteryPresent");

      if (localStorageData && socket.connected == true) {
        // If data is available in local storage, set it and stop loading
        console.log(socket.connected);
        setBackendData(JSON.parse(localStorageData));
        setIsLoading(false);
      } else {
        const timeoutId = setTimeout(() => {
          setIsLoading(false);
          setBackendData(null);
        }, 60000);

        socket.on("extractedParameters", (data) => {
          setTimeout(() => {
            setIsLoading(false);
          }, 4500);

          clearTimeout(timeoutId);

          setBackendData(data);

          // Store data in local storage
          localStorage.setItem("backendData", JSON.stringify(data));
    
        });

        return () => {
          socket.off("extractedParameters");
          localStorage.setItem("battery_Inserted",true)
          clearTimeout(timeoutId);
        };
      }
    };

    fetchData();

    return () => {
      // Clear local storage when the component unmounts
      localStorage.removeItem("backendData");
     
    };
  }, [socket]);

  if (isLoading) {
    return (
      <p>
        <Loader />
      </p>
    );
  }

  if (!backendData) {
    swal("Error", "Failed to fetch data within 1 minute.", "error");
    return (
      <div>
        <button onClick={handleRefreshClick}>Refresh</button>
        <p>Kindly Check the firmware, Ensure that the port is connected and the Backend Server has Started.</p>
      
      </div>
    );
  }

  // Render the BatteryComponent with the fetched data
  const numBatteries = 9;
  const batteriesPerRow = 3;
  const batteries = [];
  let batteryId = 1; // Initialize batteryId

  for (let i = 0; i < numBatteries; i += batteriesPerRow) {
    const rowBatteries = [];
    for (let j = i; j < i + batteriesPerRow && j < numBatteries; j++) {
      rowBatteries.push(<Battery key={batteryId} id={batteryId++} />);
    }
    batteries.push(
      <div key={i} className="battery-row">
        {rowBatteries}
      </div>
    );
  }

  return <div className="battery-dashboard">{batteries}</div>;
}

export default BatteryComponent;
