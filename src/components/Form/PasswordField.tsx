import React, { useState } from "react";
import styled from "styled-components";

import { InputField } from "@/lib/definitions";

import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";
import FieldContainer from "./FieldContainer";
import Input from "./Input";

const EyeContainer = styled.div`
  justify-content: center;
  display: flex;
  /* background-color: ${({ theme }) => theme.secondary}; */
  padding: 10px;
  & svg {
    margin: auto;
    cursor: pointer;
    color: ${({ theme }) => theme.textSecondary};
  }
`;

export default function PasswordField({
  name,
  label,
  value,
  error,
  onChange,
  onBlur,
  isError,
}: InputField) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FieldContainer isError={isError}>
      <Input
        type={showPassword ? "text" : "password"}
        name={name}
        isError={isError}
        error={error}
        label={label}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <EyeContainer onClick={() => setShowPassword(!showPassword)}>
        {!showPassword ? <RiEyeCloseLine size={22} /> : <RiEyeLine size={22} />}
      </EyeContainer>
    </FieldContainer>
  );
}
