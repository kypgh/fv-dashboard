import { ErrorMsgType, InputField } from "@/lib/definitions";
import React from "react";
import styled from "styled-components";
import ErrorMsg from "./ErrorMsg";

const Label = styled.div<ErrorMsgType>`
  display: flex;
  bottom: 0;
  top: 0;
  margin-top: auto;
  margin-bottom: auto;
  left: 10px;
  height: fit-content;
  position: absolute;
  backdrop-filter: blur(10px);
  transition: top, bottom 0.15s linear;
  color: ${({ $hasError, theme }) =>
    $hasError ? theme.error : theme.textPrimary};
`;

const InputFieldContainer = styled.input`
  background-color: transparent;
  position: relative;
  outline: none;
  padding: 8px;
  border: none;
  width: 100%;
  z-index: 2;
  overflow: hidden;

  font-size: 18px;
  color: ${({ theme }) => theme.textPrimary};
  &:focus {
    + ${Label} {
      bottom: 100%;
      top: -5px;
    }
  }

  &.hasTxt {
    + ${Label} {
      bottom: 100%;
      top: -5px;
    }
  }
`;

export default function Input({
  name,
  label,
  value,
  onChange,
  onBlur,
  isError,
  type,
  error,
}: InputField) {
  return (
    <>
      <InputFieldContainer
        value={value}
        type={type}
        name={name}
        className={!!value ? "hasTxt" : ""}
        onChange={onChange}
        onBlur={onBlur}
      />
      <Label $hasError={isError}>{label}</Label>
      {isError ? <ErrorMsg position="absolute" text={error} /> : null}
    </>
  );
}
