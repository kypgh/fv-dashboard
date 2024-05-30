import React from "react";
import styled from "styled-components";
import { CheckField, ErrorMsgType } from "@/lib/definitions";
import FieldContainer from "./FieldContainer";

const CheckBoxContainer = styled.div`
  display: flex;
  gap: 15px;
  width: 100%;
`;

const Label = styled.div<ErrorMsgType>`
  display: flex;
`;

const HiddenCheckBox = styled.input.attrs<{ $checked: boolean }>({
  type: "checkbox",
})`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  cursor: pointer;
  opacity: 0;
  &:active {
    & + div {
      &::after {
        width: 20px;
        left: ${({ $checked }) => ($checked ? "calc(100% - 21px)" : "1px")};
      }
    }
  }
`;

const CheckBox = styled.div<{ $checked: boolean }>`
  width: 40px;
  height: 20px;
  border-radius: 10px;
  border: 1px solid #ccc;
  transition: all 0.35s ease-in-out;
  display: inline-block;
  background-color: ${({ $checked, theme }) =>
    $checked ? theme.primary : "transparent"};
  position: relative;
  order: -1;
  transform-origin: top left;
  &::after {
    content: "";
    transition: all 0.35s ease-in-out;
    width: 15px;
    height: 80%;
    top: 0;
    bottom: 0;
    left: ${({ $checked, theme }) => ($checked ? "calc(100% - 16px)" : "1px")};
    margin: auto;
    background-color: ${({ $checked, theme }) =>
      $checked ? theme.white : theme.primary};
    position: absolute;
    border-radius: 10px;
  }
`; //

export default function CheckBoxField({
  name,
  label,
  value,
  isIn,
  onChange,
  onBlur,
  isError,
}: CheckField) {
  return (
    <CheckBoxContainer>
      <Label $hasError={isError}>{label}</Label>
      <HiddenCheckBox
        $checked={isIn || false}
        type="checkbox"
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <CheckBox className="checkBox" $checked={isIn || false} />
    </CheckBoxContainer>
  );
}
