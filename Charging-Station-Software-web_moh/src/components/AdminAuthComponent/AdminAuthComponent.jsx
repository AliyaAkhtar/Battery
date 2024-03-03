import React from "react";
import { Grid, Paper, TextField, Typography } from "@mui/material";
import Lottie from "lottie-react";
import animationData from "../../assets/admin.json"; // Import your Lottie animation JSON file

function AdminAuth({
  formData,
  setFormData,
  fieldErrors,
  setFieldErrors,
  e_Msg_4,
}) {
  return (
    <Grid
      
      container
      className="adminUI"
    >
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
            <h2 style={{ fontSize: "32px", margin: "10%" }}>Admin Password</h2>
            <div style={{ color: "#15A3C7", margin: "10%" }}></div>
            {e_Msg_4 && ( // Conditionally render the error message
              <Typography
                variant="body1"
                color="error"
                style={{ marginLeft: "20px" }}
              >
                {e_Msg_4}
              </Typography>
            )}
            <p style={{ fontSize: "18px", margin: "10%" }}>Enter password</p>
            <p
              className="urduText"
              style={{
                fontSize: "18px",
                margin: "10%",
                marginTop: "-20px",
                fontWeight: "bold",
              }}
            >
              پاس ورڈ درج کریں
            </p>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={10} style={{ textAlign: "right" }}>
                <TextField
                  id="password"
                  label="password"
                  variant="outlined"
                  fullWidth
                  size="small"
                  type="password"
                  value={formData.admin_password}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      admin_password: event.target.value,
                    });
                    setFieldErrors({ ...fieldErrors, admin_password: "" }); // Clear error when input changes
                  }}
                  autoComplete="off"
                  error={!!fieldErrors.admin_password} // Apply error styles when there's an error
                  helperText={fieldErrors.admin_password}
                  style={{ marginLeft: "20px" }}
                />

                {/* <div className="access-timeout-message">
            {accessTimeoutMessage}
          </div> */}
              </Grid>
            </Grid>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default AdminAuth;
