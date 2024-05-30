import React from "react";
import { styled } from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
  width: 100%;
  user-select: none;
  position: relative;
`;

const Button = styled.button`
  width: 100%;
  max-width: 200px;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.accent};
  background-color: ${({ theme }) => theme.accent};
  transition: 0.15s all linear;
  color: ${({ theme }) => theme.background};
  &:hover {
    border-color: ${({ theme }) => theme.accent};
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.textPrimary};
  }
`;
interface customProps {
  name: string;
}

const SubmitButton = ({ name }: customProps) => {
  return (
    <ButtonContainer>
      <Button type="submit">{name}</Button>
    </ButtonContainer>
  );
};

export default SubmitButton;
