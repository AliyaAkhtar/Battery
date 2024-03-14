import React from "react";
import { CardDetailsComponent } from "../../index";

function CardDetails({
  formData,
  setFormData,
  fieldErrors,
  setFieldErrors,
  e_Msg_1,
  accessTimeoutMessage
}) {

  return (
      <div className="app-container" >
        <CardDetailsComponent
          formData={formData}
          setFormData={setFormData}
          fieldErrors={fieldErrors}
          setFieldErrors={setFieldErrors}
          e_Msg_1={e_Msg_1}
          accessTimeoutMessage={{ accessTimeoutMessage }}
        />
      </div>
  );
}

export default CardDetails;
