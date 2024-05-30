"use client";
import SkelBox from "@/components/Skeleton/SkelBox";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  gap: 5px;
  & h1 {
    color: ${({ theme }) => theme.textPrimary};
  }
`;

export default function Skeleton() {
  return (
    <Container>
      <SkelBox style={{ height: "100%", width: "300px " }} />
      <SkelBox style={{ height: "100%", width: "100% " }} />
    </Container>
  );
}
