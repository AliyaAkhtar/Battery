import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  TextField,
  Typography,
  InputAdornment
} from "@mui/material";
import Lottie from "lottie-react";
import Slider from "react-slick";
import GenerateQRCode from "./generateQRCode.jsx";
import animationDataCard from "../../assets/card.json";
import qrCodeAnimation from "../../assets/transitionFromCardToBarcode.json";
import moveLeftAnimation from "../../assets/moveleft.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CardDetailsComponent.css";
function CardDetails({
  formData,
  setFormData,
  fieldErrors,
  setFieldErrors,
  e_Msg_1,
  accessTimeoutMessage,
}) {
  const formatCardNumber = (value) => {
    const formattedInput = value.replace(/\D/g, "");
    const formattedWithHyphens = formattedInput.replace(/(\d{4})(?!$)/g, "$1-");
    const trimmedValue = formattedWithHyphens.slice(0, 14);
    return trimmedValue;
  };

  const formatPassword = (value) => {
    const formattedInput = value.replace(/\D/g, "");
    const trimmedValue = formattedInput.slice(0, 4);
    return trimmedValue;
  };

  const [id, setId] = useState(localStorage.getItem("Y_id"));
  const jsonStringForSOC = localStorage.getItem("SOC") || "0";
  const currentbatterydataJson = localStorage.getItem("currentBatteryData");

  const myComplexObject = JSON.parse(jsonStringForSOC) || "0";
  const currentbatterydataObject = JSON.parse(currentbatterydataJson);

  const soc = JSON.stringify(currentbatterydataObject?.soc || "0");
  const battery_macAddress = JSON.stringify(
    currentbatterydataObject?.macAddress || "0"
  );

  localStorage.setItem("field_soc", soc);
  localStorage.setItem("field_mac", battery_macAddress);
  localStorage.setItem("battery_Inserted", true);
  //-------------------------------for slider----------------------------//
  const [showMessage, setShowMessage] = useState(true);
  const [currentSlide, setCurrentSlide] = useState("");
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowMessage(false);
    }, 4000);

    return () => clearTimeout(timeoutId);
  }, []);
  const slides = [
    <div key={"Manully Card"}>
      <Grid container className="cardUI">
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
            <Lottie
              animationData={animationDataCard}
              height={300}
              width={300}
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
              boxShadow: "none", // Remove the box shadow
            }}
          >
            <div className="slider-container">
              <h2 style={{ fontSize: "32px", margin: "10%" }}>AIM Cards</h2>
              {showMessage && (
                <div className="fade-message">
                  <Lottie
                    animationData={moveLeftAnimation}
                    height={300}
                    width={300}
                    loop={true}
                  />
                </div>
              )}

              <div style={{ color: "#15A3C7", margin: "10%" }}></div>
              <p style={{ fontSize: "18px", margin: "10%" }}>
                Enter your card details
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
                اپنے کارڈ کی تفصیلات درج کریں۔
              </p>

              {e_Msg_1 && (
                <Typography
                  variant="body1"
                  color="error"
                  style={{ marginLeft: "30px" }}
                >
                  {e_Msg_1}
                </Typography>
              )}
              <p style={{ fontSize: "18px", margin: "10%" }}></p>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={10} style={{ textAlign: "right" }}>
                  <TextField
                    id="Card No"
                    label="Card No"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={formatCardNumber(formData.card_No)}
                    onChange={(event) => {
                      const formattedValue = formatCardNumber(
                        event.target.value
                      );
                      setFormData({ ...formData, card_No: formattedValue });
                      setFieldErrors({ ...fieldErrors, card_No: "" });
                    }}
                    autoComplete="off"
                    error={!!fieldErrors.card_No}
                    helperText={fieldErrors.card_No}
                    style={{ marginLeft: "30px" }}
                  />
                </Grid>
                <Grid item xs={12} sm={10} style={{ textAlign: "right" }}>
                  <TextField
                    id="password"
                    label="Password (4-digit PIN)"
                    variant="outlined"
                    type="password"
                    fullWidth
                    size="small"
                    value={formatPassword(formData.password)}
                    onChange={(event) => {
                      const formattedValue = formatPassword(event.target.value);
                      setFormData({ ...formData, password: formattedValue });
                      setFieldErrors({ ...fieldErrors, password: "" });
                    }}
                    autoComplete="off"
                    error={!!fieldErrors.password}
                    helperText={fieldErrors.password}
                    style={{ marginLeft: "30px" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {formData.password &&
                            "x".repeat(formData.password.length)}
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Typography
                    variant="body1"
                    color="error"
                    style={{ marginLeft: "15px", marginTop: "15px" }}
                  >
                    {accessTimeoutMessage
                      ? accessTimeoutMessage.accessTimeoutMessage
                      : null}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>,
    <div key={"barcode"}>
      <Grid container className="cardUI">
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
            <div style={{ width: "200px", height: "200px" }}>
              <Lottie
                animationData={qrCodeAnimation}
                height={500}
                width={500}
                loop={true}
              />
            </div>
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
              <h2
                style={{
                  fontSize: "28px",
                  margin: "10%",
                  whiteSpace: "nowrap",
                }}
              >
                QR-CODE 
              </h2>

              <div style={{ color: "#15A3C7", margin: "10%" }}></div>
              <p
                style={{
                  fontSize: "18px",
                  margin: "10%",
                  whiteSpace: "nowrap",
                }}
              >
                Kindly Scan the Below Qr-Code
              </p>
              <p
                className="urduText"
                style={{
                  fontSize: "18px",
                  margin: "10%",
                  marginTop: "-20px",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                برائے مہربانی درج ذیل کیو آر کوڈ اسکین کریں
              </p>

              {e_Msg_1 && (
                <Typography
                  variant="body1"
                  color="error"
                  style={{ marginLeft: "30px" }}
                >
                  {e_Msg_1}
                </Typography>
              )}
              <p style={{ fontSize: "18px", margin: "10%" }}></p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <GenerateQRCode size={100} />
              </div>
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
  

  //----------------------------------------------//
  return (
    <Slider {...sliderSettings}>
      {slides.map((slide, index) => (
        <div key={index}>{slide}</div>
      ))}
    </Slider>
  );
}

export default CardDetails;
