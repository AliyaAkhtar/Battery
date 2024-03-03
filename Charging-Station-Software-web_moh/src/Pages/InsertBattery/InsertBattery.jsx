import React from "react";
import { InsertBatteryComponent } from "../../index";

function InsertBattery({
  formData,
  setFormData,
  fieldErrors,
  setFieldErrors,
  e_Msg_2,
sete_Msg_2,
}) {
  return (
    <div className="app-container">
      <InsertBatteryComponent
        formData={formData}
        setFormData={setFormData}
        fieldErrors={fieldErrors}
        setFieldErrors={setFieldErrors}
        e_Msg_2={e_Msg_2}
        sete_Msg_2={sete_Msg_2}
      />
    </div>
  );
}

export default InsertBattery;
