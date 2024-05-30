import React from "react";
import CheckBoxField from "@/components/Form/CheckBoxField";
import { useField } from "formik";
import { CheckField } from "@/lib/definitions";

type InputField = {
  name: string;
  label: string;
};

export default function FCheckBoxField({
  name,
  label,
  value,
  description,
  id,
}: CheckField) {
  const [field, meta, helpers] = useField(name);

  return (
    <CheckBoxField
      description={description}
      name={name}
      label={label}
      value={value}
      onBlur={field.onBlur}
      onChange={field.onChange}
      isIn={field.value.includes(value)}
      error={meta.error}
      id={id}
      isError={!!meta.error && meta.touched}
    />
  );
}
