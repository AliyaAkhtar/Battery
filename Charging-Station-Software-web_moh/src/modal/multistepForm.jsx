import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Button,
  Stepper,
  Step,
  StepLabel,
  Dialog,
  DialogContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import url from "../services/url.js";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { APis } from "../services";
import { ThemeContext } from "../ThemeContext.jsx";
import { ThemeProvider } from "@mui/material/styles";

import {
  CardDetails,
  InsertBattery,
  PaymentCalc,
  AdminAuth,
  SuccessAnimation,
} from "../index";
import { handleClear } from "../components/localStorageUtils/localStorageUtils.js";

const steps = [
  "Card Details",
  "Insert Battery",
  "Payment Calculation",
  "Enter Admin Password",
  "Success",
];
// Define initial form data and field errors
const initialFormData = {
  card_No: "",
  password: "",
  X_battery_id: "",
  X_voltage: "",
  X_SOC: "",
  Y_SOC: "",
  station_id: "",
  amount: "",
  payment_status: "",
  battery_returned_id: "",
  battery_returned_SOC: "",
  battery_issued_id: "",
  battery_issued_SOC: "",
  admin_password: "",
};

const errorFormData = {
  card_No: "",
  password: "",
  X_battery_id: "",
  X_voltage: "",
  X_SOC: "",
  Y_SOC: "",
  station_id: "",
  amount: "",
  payment_status: "",
  battery_returned_id: "",
  battery_returned_SOC: "",
  battery_issued_id: "",
  battery_issued_SOC: "",
  admin_password: "",
};
const MultiStepForm = ({ open, handleClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const [fieldErrors, setFieldErrors] = useState(errorFormData);
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state
  const [e_Msg_1, sete_Msg_1] = useState(null);
  const [e_Msg_2, sete_Msg_2] = useState(null);
  const [e_Msg_3, sete_Msg_3] = useState(null);
  const [e_Msg_4, sete_Msg_4] = useState(null);
  const [accessTimeoutMessage, setAccessTimeoutMessage] = useState(null);
  const [access_token, setAccess_token] = useState(
    localStorage.getItem("access_token")
  );

  const { theme } = useContext(ThemeContext);

  const [battery_Inserted, setbattery_Inserted] = useState(
    JSON.parse(localStorage.getItem("battery_Inserted"))
  );
  // console.log(typeof battery_Inserted)
  useEffect(() => {
    const checkBatteryInserted = () => {
      const batteryIsertedCondition = JSON.parse(
        localStorage.getItem("battery_Inserted")
      );
      setbattery_Inserted(batteryIsertedCondition);
    };

    const intervalId = setInterval(checkBatteryInserted, 1000); // Check every second

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Use useRef to keep track of the timeout
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    clearTimeout(timeoutRef.current);

    // Set a new timeout for 2 minutes (120,000 milliseconds)
    timeoutRef.current = setTimeout(() => {
      // Close the modal when the timeout is reached
      handleClose();
      handleClear();
      setActiveStep(0);
      setFormData((prevFormData) => ({
        ...prevFormData,
        card_No: "",
        password: "",
        admin_password: "",
      }));
    }, 180000);
  };

  // Reset the timeout whenever there is user activity
  const handleUserActivity = () => {
    resetTimeout();
  };

  // Attach event listeners for user activity
  useEffect(() => {
    document.addEventListener("mousemove", handleUserActivity);
    document.addEventListener("keydown", handleUserActivity);

    // Start the initial timeout
    resetTimeout();

    // Clean up the event listeners when the component unmounts
    return () => {
      document.removeEventListener("mousemove", handleUserActivity);
      document.removeEventListener("keydown", handleUserActivity);

      // Clear the timeout when the component unmounts
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const step2 = () => {
      const jsonStringForAmount = localStorage.getItem("amount");
      const myComplexObjectForAmount = JSON.parse(jsonStringForAmount);
      const field_amount = JSON.stringify(myComplexObjectForAmount);

      const jsonStringForSOC = localStorage.getItem("field_soc");
      const field_soc = JSON.parse(jsonStringForSOC);

      const jsonStringForMac = localStorage.getItem("field_mac");
      const loc_id = JSON.parse(jsonStringForMac);

      const jsonStringForBatteryPresence =
        localStorage.getItem("batteryPresent");

      const data = JSON.parse(jsonStringForBatteryPresence);

      const firstFalseBatteryId = localStorage.getItem("FalseBatteryId");
      const firstFalseBatteryIdSOC = data[firstFalseBatteryId]?.soc || "";
      const firstFalseBatteryIdVoltage =
        data[firstFalseBatteryId]?.voltage || "";
      const firstFalseBatteryIdMac = data[firstFalseBatteryId]?.batteryID || "";

      setFormData((prevFormData) => ({
        ...prevFormData,
        station_id: "2",
        payment_status: "PAID",
        Y_SOC: field_soc || "",
        amount: field_amount || "",
        battery_issued_id: loc_id || "",
        battery_issued_SOC: field_soc || "",
        X_battery_id: firstFalseBatteryIdMac || "",
        X_SOC: firstFalseBatteryIdSOC || "",
        X_voltage: firstFalseBatteryIdVoltage || "",
        battery_returned_id: firstFalseBatteryIdMac || "",
        battery_returned_SOC: firstFalseBatteryIdSOC || "",
      }));
    };

    const intervalId = setInterval(step2, 1000); // Check every second

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [localStorage.getItem("batteryReturnedSOC")]);

  // Function to update localStorage and set state

  const step1_Data = {
    number: formData.card_No,
    password: formData.password,
  };
  const step2_Data = {
    X_battery_id: formData.X_battery_id,
    X_voltage: formData.X_voltage,
    X_SOC: parseInt(formData.X_SOC, 10), // Convert X_SOC to an integer
    Y_SOC: parseInt(formData.Y_SOC, 10),
  };
  const step3_Data = {
    station_id: formData.station_id,
    amount: Math.abs(formData.amount),
    payment_status: formData.payment_status,
    battery_returned_id: formData.battery_returned_id,
    battery_returned_SOC: parseInt(formData.X_SOC, 10),
    battery_issued_id: formData.battery_issued_id,
    battery_issued_SOC: parseInt(formData.Y_SOC, 10),
  };
  const step4_Data = {
    password: formData.admin_password,
  };

  const validateStep1 = () => {
    let valid = true;
    const errors = {};

    if (!formData.card_No.trim()) {
      setIsLoading(false); // Hide loader after the delay
      errors.card_No = "Card No is required";
      valid = false;
    }

    if (!formData.password.trim()) {
      setIsLoading(false); // Hide loader after the delay
      errors.password = "Password is required";
      valid = false;
    }

    setFieldErrors({ ...fieldErrors, ...errors });
    return valid;
  };

  const validateStep2 = () => {
    let valid = true;
    const errors = {};

    if (!formData.X_battery_id) {
      setIsLoading(false); // Hide loader after the delay
      errors.X_battery_id = "X Battery ID is required";
      valid = false;
    }

    if (!formData.X_voltage) {
      setIsLoading(false); // Hide loader after the delay
      errors.X_voltage = "X Voltage is required";
      valid = false;
    }

    if (!formData.X_SOC) {
      setIsLoading(false); // Hide loader after the delay
      errors.X_SOC = "X SOC is required";
      valid = false;
    }

    if (!formData.Y_SOC) {
      setIsLoading(false); // Hide loader after the delay
      errors.Y_SOC = "Y SOC is required";
      valid = false;
    }

    setFieldErrors({ ...fieldErrors, ...errors });
    return valid;
  };

  const validateStep3 = () => {
    let valid = true;
    const errors = {};

    if (!formData.station_id) {
      setIsLoading(false); // Hide loader after the delay
      errors.station_id = "Station ID is required";
      valid = false;
    }

    if (!formData.amount) {
      setIsLoading(false); // Hide loader after the delay
      errors.amount = "Amount is required";
      valid = false;
    }
    if (!formData.payment_status) {
      setIsLoading(false); // Hide loader after the delay
      errors.payment_status = "Amount is required";
      valid = false;
    }
    if (!formData.X_battery_id) {
      setIsLoading(false); // Hide loader after the delay
      errors.battery_returned_id = "Amount is required";
      valid = false;
    }
    if (!formData.X_SOC) {
      setIsLoading(false); // Hide loader after the delay
      errors.battery_returned_SOC = "Amount is required";
      valid = false;
    }
    if (!formData.battery_issued_id) {
      setIsLoading(false); // Hide loader after the delay
      errors.battery_issued_id = "Amount is required";
      valid = false;
    }
    if (!formData.Y_SOC) {
      setIsLoading(false); // Hide loader after the delay
      errors.battery_issued_SOC = "Amount is required";
      valid = false;
    }
    // Add validation for other fields in step 3

    setFieldErrors({ ...fieldErrors, ...errors });
    return valid;
  };

  const validateStep4 = () => {
    let valid = true;
    const errors = {};

    if (!formData.admin_password.trim()) {
      setIsLoading(false); // Hide loader after the delay
      errors.admin_password = "Admin Password is required";
      valid = false;
    }

    // Add validation for other fields in step 4

    setFieldErrors({ ...fieldErrors, ...errors });
    return valid;
  };

  // Continue defining similar validation functions for other steps

  const handleNext = async (event) => {
    // event.preventDefault();

    if (isLoading) return; // Prevent multiple submissions while loading

    setIsLoading(true); // Show loader on button click

    if (isLastStep) {
      // Clear all items from localStorage

      navigate("/feedback");
      console.log(formData);
    } else if (activeStep === 0) {
      const isValid = validateStep1(); // Validate step 1
      console.log(step1_Data);
      if (isValid) {
        try {
          sete_Msg_1(null); // Set the error message in state
          const response = await axios.post(url.url + APis.APi_1, step1_Data);
          console.log("successfully", response);
          const access_token = response.data.access_token;
          const swap_card = response.data.swap_card.swap_card_id;
          localStorage.setItem("swap_card_id", swap_card);
          console.log("to see", swap_card);
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("access_token_time", Date.now()); // Store the current timestamp
          // Simulate a 3-second delay before moving to the next step
          setTimeout(() => {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setIsLoading(false); // Hide loader after the delay
          }, 3000);
        } catch (error) {
          console.log(error);
          setIsLoading(false); // Hide loader in case of an error
          const errorMessage =
            error.response?.data?.msg || error.response?.data?.error; // Get the error message or set a default message
          sete_Msg_1(errorMessage); // Set the error message in state
          // Clear the error message after 3 seconds
          setTimeout(() => {
            sete_Msg_1(""); // Clear the error message after 3 seconds
          }, 3000);

          // localStorage.removeItem("access_token");
        }
      }
    } else if (activeStep === 1) {
      sete_Msg_2(null); // Set the error message in state
      const isValid = validateStep2(); // Validate step 1
      if (isValid) {
        try {
          console.log(step2_Data);

          const access_token = localStorage.getItem("access_token");
          const response = await axios.post(url.url + APis.APi_2, step2_Data, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          });
          localStorage.setItem("amount", response.data.amount);
          console.log("successfully", response.data.amount);

          setTimeout(() => {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setIsLoading(false); // Hide loader after the delay
          }, 3000);
        } catch (error) {
          console.log(error);
          setIsLoading(false); // Hide loader in case of an error
          const errorMessage =
            error.response?.data?.msg || error.response?.data?.error; // Get the error message or set a default message
          sete_Msg_2(errorMessage); // Set the error message in state
          setTimeout(() => {
            sete_Msg_2("");
          }, 5000);
        }
      }
    } else if (activeStep === 2) {
      sete_Msg_3(null); // Set the error message in state
      console.log(step3_Data);
      const isValid = validateStep3(); // Validate step 1

      if (isValid) {
        console.log(step3_Data);
        try {
          // console.log(step3_Data);

          setTimeout(() => {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setIsLoading(false); // Hide loader after the delay
          }, 3000);
        } catch (error) {
          console.log(error);
          setIsLoading(false); // Hide loader in case of an error
          sete_Msg_3(error); // Set the error message in state
          setTimeout(() => {
            sete_Msg_3(""); // Set the error message in state
          }, 3000);
        }
      } else {
        console.log(step3_Data);
      }
    } else if (activeStep === 3) {
      const isValid = validateStep4(); // Validate step 1
      sete_Msg_4(null); // Set the error message in state
      if (isValid) {
        try {
          const access_token = localStorage.getItem("access_token");
          const response_for_payment = await axios.post(
            url.url + APis.APi_3,
            step3_Data,
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          );
          console.log(
            "successfully for payment",
            response_for_payment.data.msg
          );
          if (
            response_for_payment.data.msg ===
            "Payment details saved successfully"
          ) {
            const response = await axios.post(url.url + APis.APi_4, step4_Data);
            console.log("successfully for admin", response.data.msg);
          } else {
            const errorMessage =
              response_for_payment.data?.msg || error.response?.data?.error; // Get the error message or set a default message
            sete_Msg_3(errorMessage); // Set the error message in state
            setTimeout(() => {
              sete_Msg_3(""); // Set the error message in state
            }, 3000);
            console.log(response_for_payment.data.error);
          }
          setTimeout(() => {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setIsLoading(false); // Hide loader after the delay
          }, 3000);
        } catch (error) {
          console.log(error);
          setIsLoading(false); // Hide loader in case of an error
          const errorMessage =
            error.response?.data?.msg || error.response?.data?.error; // Get the error message or set a default message

          sete_Msg_4(errorMessage); // Set the error message in state
          setTimeout(() => {
            sete_Msg_4(""); // Set the error message in state
          }, 3000);
        }
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setIsLoading(false); // Hide loader for non-auth steps
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleCancel = () => {
    handleClear();
    handleClose();

    setActiveStep(0);
    setFormData((prevFormData) => ({
      ...prevFormData,
      card_No: "",
      password: "",
      admin_password: "",
    }));
  };

  const isLastStep = activeStep === steps.length - 1;

  const stepContent = [
    <CardDetails
      formData={formData}
      setFormData={setFormData}
      fieldErrors={fieldErrors}
      setFieldErrors={setFieldErrors}
      e_Msg_1={e_Msg_1}
      accessTimeoutMessage={accessTimeoutMessage}
    />,
    <InsertBattery
      formData={formData}
      setFormData={setFormData}
      fieldErrors={fieldErrors}
      setFieldErrors={setFieldErrors}
      e_Msg_2={e_Msg_2}
      sete_Msg_2={sete_Msg_2}
      handleClose={handleClose}
    />,
    <PaymentCalc
      formData={formData}
      setFormData={setFormData}
      fieldErrors={fieldErrors}
      setFieldErrors={setFieldErrors}
      e_Msg_3={e_Msg_3}
    />,
    <AdminAuth
      formData={formData}
      setFormData={setFormData}
      fieldErrors={fieldErrors}
      setFieldErrors={setFieldErrors}
      e_Msg_4={e_Msg_4}
    />,
    <SuccessAnimation />,
  ];

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={() => { }} fullWidth maxWidth="md">
        <DialogContent >
          <div style={{ marginBottom: "16px" }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>
          <div
            style={{
              marginBottom: "16px",
              marginLeft: "10%",
              marginRight: "10%",
              marginTop: "16px",
              backgroundColor: theme.palette.mode === 'dark' ? '#383838' : '#ffffff',
            }}
          >
            {stepContent[activeStep]}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "12px",
            }}
          >
            {/* <Button variant="contained" color="secondary" onClick={handleClose}>
            close
          </Button> */}

            {/* {activeStep > 0 && (
            <Button variant="contained" color="secondary" onClick={handleBack}>
              Back
            </Button>
          )} */}
            {activeStep < 1 && (
              <Button variant="contained" color="error" onClick={handleCancel}>
                cancel
                {/* <CancelPresentationTwoToneIcon onClick={handleCancel}/> */}
              </Button>
            )}
            <Button
              type="submit"
              variant="contained"
              style={{ marginLeft: "auto" }}
              color="primary"
              onClick={handleNext}
              disabled={
                isLoading || (activeStep === 1 && battery_Inserted) // Disable the button for step 2 if flagValue is false
              }
            >
              {isLoading ? (
                <CircularProgress size={24} />
              ) : isLastStep ? (
                "Finish"
              ) : (
                "Next"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export default MultiStepForm;
