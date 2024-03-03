import React, { useContext } from "react";
import { CardDetailsComponent } from "../../index";
import { ThemeContext } from "../../ThemeContext";
import { ThemeProvider } from "@mui/material/styles";

function CardDetails({
  formData,
  setFormData,
  fieldErrors,
  setFieldErrors,
  e_Msg_1,
  accessTimeoutMessage
}) {
  const { theme } = useContext(ThemeContext);

  return (
    <ThemeProvider theme={theme}>
      <div className="app-container" style={{ backgroundColor: theme.palette.mode === 'dark' ? '#383838' : '#ffffff', }}>
        <CardDetailsComponent
          formData={formData}
          setFormData={setFormData}
          fieldErrors={fieldErrors}
          setFieldErrors={setFieldErrors}
          e_Msg_1={e_Msg_1}
          accessTimeoutMessage={{ accessTimeoutMessage }}
        />
      </div>
    </ThemeProvider>
  );
}

export default CardDetails;
