import { ErrorMsgType } from "@/lib/definitions";
import React from "react";
import styled from "styled-components";

const Container = styled.div<ErrorMsgType>`
  display: flex;
  position: relative;
  border-radius: 8px;
  /* padding: 5px; */

  width: 100%;
  margin: 10px 0;
  max-width: 300px;
  border: ${({ $hasError, theme }) =>
    $hasError
      ? `1px solid ${theme.error}`
      : `1px solid ${theme.textSecondary}`};
`;

type FieldContainerProps = {
  name?: string;
  isError?: boolean;
  children: React.ReactNode;
  className?: string;
};

export default function FieldContainer({
  name,
  isError,
  className,
  children,
}: FieldContainerProps) {
  return (
    <Container $hasError={isError} className={className}>
      {children}
      {/* <Label $hasError={isError}>{name}</Label> */}
    </Container>
  );
}
