import React from "react";
import CheckBoxField from "@/components/Form/CheckBoxField";
import { useField } from "formik";
import { CheckField } from "@/lib/definitions";
import styled from "styled-components";
import FieldContainer from "@/components/Form/FieldContainer";

const FieldContainerExtend = styled.div`
  flex-direction: column;
  position: relative;
  cursor: pointer;
  margin: 3px 0;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.background};
  background: ${({ theme }) => theme.background};
  border-radius: 5px;
  & span {
    color: ${({ theme }) => theme.textSecondary};
  }
`;

type InputField = {
  name: string;
  label: string;
};

export default function FPermissionInput({
  name,
  label,
  value,
  description,
  id,
}: CheckField) {
  const [field, meta, helpers] = useField(name);

  return (
    <FieldContainerExtend>
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
      />
      <span>{description}</span>
    </FieldContainerExtend>
  );
}
