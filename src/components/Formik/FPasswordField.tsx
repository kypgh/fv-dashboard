import React from "react";

import { useField } from "formik";
import PasswordField from "../Form/PasswordField";

type InputField = {
  name: string;
  label: string;
};

export default function FPasswordField({ name, label }: InputField) {
  const [field, meta, helpers] = useField(name);

  return (
    <PasswordField
      name={name}
      label={label}
      value={field.value}
      onBlur={field.onBlur}
      onChange={field.onChange}
      error={meta.error}
      isError={!!meta.error && meta.touched}
    />
  );
}
