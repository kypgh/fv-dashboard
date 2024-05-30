import React from "react";
import styled from "styled-components";
import { ABeeZee } from "next/font/google";
import { InputField } from "@/lib/definitions";
import FieldContainer from "./FieldContainer";
import Input from "./Input";
import ErrorMsg from "./ErrorMsg";

interface ErrorMsg {
  $hasError: boolean | "" | undefined;
}
const Label = styled.div<ErrorMsg>`
  display: flex;
  bottom: 0;
  top: 0;
  margin-top: auto;
  margin-bottom: auto;
  left: 10px;
  height: fit-content;
  position: absolute;
  transition: all 0.15s linear;
  color: ${({ $hasError }) => ($hasError ? "red" : "white")};
`;

export default function TextField({
  name,
  label,
  value,
  error,
  onChange,
  onBlur,
  isError,
}: InputField) {
  return (
    <FieldContainer isError={isError}>
      <Input
        type="text"
        name={name}
        isError={isError}
        label={label}
        error={error}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </FieldContainer>
  );
}
