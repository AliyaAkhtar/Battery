import React from "react";
import { AdminAuthComponent } from "../../index";

function AdminAuth({
  formData,
  setFormData,
  fieldErrors,
  setFieldErrors,
  e_Msg_4,
}) {
  return (
    <AdminAuthComponent
      formData={formData}
      setFormData={setFormData}
      fieldErrors={fieldErrors}
      setFieldErrors={setFieldErrors}
      e_Msg_4={e_Msg_4}
    />
  );
}

export default AdminAuth;
