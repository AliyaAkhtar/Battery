import React from "react";
import { Grid, Paper, Button } from "@mui/material";
import { introdata, meta } from "../home_content/home_content";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import "./HomeComponentStyles.css";
function HomeComponent() {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/battery");
  };

  return (
    <Grid container className="container_home">
      <Grid item xs={11} md={6} className="text">
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <div>
          <h2 style={{ fontSize: "32px", margin: "10%", color: "#F5F5F5" }}>
            {introdata.title}
          </h2>
          <div style={{ color: "#15A3C7", margin: "10%" }}>
            <h1>
              <Typewriter
                options={{
                  strings: [
                    introdata.animated.first,
                    introdata.animated.second,
                    introdata.animated.third,
                    introdata.animated.fourth,
                    introdata.animated.fifth,
                    introdata.animated.sixth,
                  ],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 10,
                }}
              />
            </h1>
          </div>
          <p style={{ fontSize: "18px", margin: "10%", color: "#F5F5F5" }}>
            {introdata.description}
          </p>
          <div style={{ margin: "10%" }}>
            <Button
              variant="contained"
              style={{ borderRadius: "0" }}
              onClick={handleGetStartedClick}
              endIcon={<ElectricBoltIcon />}
            >
              Get Started
            </Button>
          </div>
        </div>
        {/* </Paper> */}
      </Grid>

      {/* Right */}
      <Grid item xs={12} md={6} className="image_home">
        <img
          src={introdata.your_img_url}
          alt="home"
          style={{ maxHeight: "70%", maxWidth: "100%" }}
        />
        {/* </Paper> */}
      </Grid>
    </Grid>
  );
}

export default HomeComponent;
