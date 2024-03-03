import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";

const GenerateQRCode = () => {
  const [qrText, setQrText] = useState("");

  useEffect(() => {
    // Get the current date
    const currentDate = new Date();
    // Format the date as desired (e.g., YYYY-MM-DD)
    const formattedDate = currentDate.toISOString().split("T")[0];
    // Constant value
    const constantValue = "NED UNIVERSITY station 1";
    // Generate a random number (between 1000 and 9999)
    const randomNumber = Math.floor(Math.random() * 9000) + 1000;
    // Combine the constant value, formatted date, and random number
    const newQrText = `${constantValue}-${formattedDate}-${randomNumber}`;
    setQrText(newQrText);
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div>
      <QRCode value={qrText} size={120} />
    </div>
  );
};

export default GenerateQRCode;
