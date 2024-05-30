import React from "react";
import TextField from "../Form/TextField";
import { useField } from "formik";

type InputField = {
  name: string;
  label: string;
};

export default function FTextField({ name, label }: InputField) {
  const [field, meta, helpers] = useField(name);

  return (
    <TextField
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
