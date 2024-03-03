import React from "react";
import { PaymentCalcComponent } from "../../index";

function PaymentCalc({
  formData,
  setFormData,
  fieldErrors,
  setFieldErrors,
  e_Msg_3,
}) {
  return (
    <div className="app-container">
      <PaymentCalcComponent
        formData={formData}
        setFormData={setFormData}
        fieldErrors={fieldErrors}
        setFieldErrors={setFieldErrors}
        e_Msg_3={e_Msg_3}
      />
    </div>
  );
}

export default PaymentCalc;
