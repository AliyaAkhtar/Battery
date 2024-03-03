import React, { useState, useEffect } from "react";
import { Grid, Paper, TextField, Typography, Button } from "@mui/material";
import Lottie from "lottie-react";
import animationData from "../../assets/PaymentCalc.json"; // Import your Lottie animation JSON file
import Calculator2 from "../../assets/calculator2.json";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./PaymentCalcStyles.css";
import moveLeftAnimation from "../../assets/moveleft.json";
import Paypal from "../../assets/Paypal.json";
function PaymentCalc({ formData, e_Msg_3 }) {
  const [animationCompleted, setAnimationCompleted] = useState(false);

  // Function to handle animation completion
  const handleAnimationComplete = () => {
    setAnimationCompleted(true);
  };

  const [fieldErrors, setFieldErrors] = useState({
    phoneNumber: "",
    email: "",
  });

  const validatePhoneNumber = (phoneNumber) => {
    // Validate phone number format
    return /^(\+92)\d{10}$/.test(phoneNumber);
  };

  const validateEmail = (email) => {
    // Validate email format
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleProceed = () => {
    // Validate email and phone number fields
    if (!validatePhoneNumber(formData.phoneNumber)) {
      setFieldErrors({
        ...fieldErrors,
        phoneNumber: "Invalid phone number",
      });
      return;
    }
    if (!validateEmail(formData.email)) {
      setFieldErrors({
        ...fieldErrors,
        email: "Invalid email address",
      });
      return;
    }

    // Proceed with payment logic here
    console.log("Proceeding with payment...");
  };

  //-------------------------------for slider----------------------------//
  const [showMessage, setShowMessage] = useState(true);
  const [currentSlide, setCurrentSlide] = useState("");
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowMessage(false);
    }, 8000);

    return () => clearTimeout(timeoutId);
  }, []);
  const slides = [
    <div key={"Manual Payment"}>
      <Grid container className="paymentUI">
        {/* Left */}
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
              <div className="slider-container">
                <h2 style={{ fontSize: "32px", margin: "10%" }}>
                  Calculating Payment
                </h2>

                {showMessage && animationCompleted && (
                  <div
                    className="fade-message"
                  
                  >
                    <Lottie
                      animationData={moveLeftAnimation}
                      height={0}
                      width={0}
                      loop={true}
                    />
                  </div>
                )}
                <div style={{ color: "#15A3C7", margin: "10%" }}></div>
                {e_Msg_3 && ( // Conditionally render the error message
                  <Typography
                    variant="body1"
                    color="error"
                    style={{ marginLeft: "20px" }}
                  >
                    {e_Msg_3}
                  </Typography>
                )}
                <p style={{ fontSize: "18px", margin: "10%" }}>
                  Please wait while we are calculating your bill
                </p>
                <p
                  className="urduText"
                  style={{
                    fontSize: "18px",
                    margin: "10%",
                    marginTop: "-20px",
                    fontWeight: "bold",
                  }}
                >
                  براہ کرم انتظار کریں جب تک ہم آپ کے بل کا حساب کر رہے ہیں۔
                </p>

                <Grid container spacing={2}>
                  {animationCompleted ? (
                    <div className="beautiful-amount">
                      <p className="amount-label">Price: </p>
                      <div className="formatted-amount">
                        {Math.abs(formData.amount)}
                      </div>
                    </div>
                  ) : (
                    <Lottie
                      animationData={Calculator2}
                      style={{
                        height: "200px",
                        width: "200px",
                        marginLeft: "40px",
                        marginTop: "-30px",
                      }}
                      loop={false}
                      onComplete={handleAnimationComplete}
                    />
                  )}
                </Grid>
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>,
    <div key={"online Transaction"}>
      <Grid container className="paymentUI">
        {/* Left */}
        <Grid item xs={12} md={5}>
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
            <Lottie animationData={Paypal} height={300} width={300} />
          </Paper>
        </Grid>
             {/* Right */}
        <Grid item xs={12} sm={6} style={{ backgroundColor: "red"}}>
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
                Online Payment
              </h2>
              <div style={{ color: "#15A3C7", margin: "10%" }}></div>

              <p style={{ fontSize: "18px", margin: "10%" }}>
                Enter your personal information
              </p>
              <p
                className="urduText"
                style={{
                  fontSize: "18px",
                  margin: "10%",
                  marginTop: "-20px",
                  fontWeight: "bold",
                }}
              >
              اپنی ذاتی معلومات درج کریں۔
              </p>
              <Grid container spacing={2} > 
                <Grid item xs={6} sm={6} style={{ textAlign: "right" }}>
                  <TextField
                    id="First Name"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    size="small"
                    autoComplete="off"
                    style={{ marginLeft: "30px" }}
                  />
                </Grid>
                <Grid item xs={6} sm={6} style={{ textAlign: "right" }}>
                  <TextField
                    id="Last Name"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    size="small"
                    autoComplete="off"
                    style={{ marginLeft: "30px" }}
                  />
                </Grid>
                <Grid item xs={6} sm={6} style={{ textAlign: "right" }}>
                  <TextField
                    id="Phone Number"
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    size="small"
                    autoComplete="off"
                    style={{ marginLeft: "30px" }}
                    error={!!fieldErrors.phoneNumber} // Check if there's an error
                    helperText={fieldErrors.phoneNumber} // Display error message
                    onChange={(event) => {
                      // Update formData state for phone number
                      setFormData({ ...formData, phoneNumber: event.target.value });
                      // Clear phone number error when input changes
                      setFieldErrors({ ...fieldErrors, phoneNumber: "" });
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={6} style={{ textAlign: "right" }}>
                  <TextField
                    id="Email ID"
                    label="Email ID"
                    variant="outlined"
                    fullWidth
                    size="small"
                    autoComplete="off"
                    style={{ marginLeft: "30px" }}
                    error={!!fieldErrors.email} // Check if there's an error
                    helperText={fieldErrors.email} // Display error message
                    onChange={(event) => {
                      // Update formData state for email
                      setFormData({ ...formData, email: event.target.value });
                      // Clear email error when input changes
                      setFieldErrors({ ...fieldErrors, email: "" });
                    }}
                  />
                </Grid>
                <div style={{ margin: "8% " }}>
                  <Button
                    variant="contained"
                    style={{ borderRadius: "0",marginLeft: "30px" }}
                    // onClick={handleGetStartedClick}
                    // endIcon={<ElectricBoltIcon />}
                  >
                    Proceed to payment
                  </Button>
                </div>
              </Grid>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>,
  ];

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => {
      setCurrentSlide(index);
      const currentSlideKey = slides[index].key;
      console.log(`Current Slide Index: ${index}, Key: ${currentSlideKey}`);
    },
  };
  //--------------------------------------------------------//
  return (
    <Slider {...sliderSettings}>
      {slides.map((slide, index) => (
        <div key={index}>{slide}</div>
      ))}
    </Slider>
  );
}

export default PaymentCalc;
