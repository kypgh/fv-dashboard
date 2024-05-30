"use client";
import SkelBox from "@/components/Skeleton/SkelBox";
import { Flex } from "@/components/generic";
import { H3 } from "@/components/typography";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 100%;
  gap: 15px;

  & h1 {
    color: ${({ theme }) => theme.textPrimary};
  }
`;

const TableContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  border-radius: 8px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
`;
const HField = styled.div`
  display: flex;
  width: calc(100% / 3);
  padding: 10px;
  min-width: 250px;
  flex: 1;
  min-height: 20px;
  border-radius: 8px;
  background-color: transparent;
`;

const TableContent = styled.div`
  /* padding: 5px; */
  border-radius: 8px;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export default function Loading() {
  return (
    <Container>
      <h1>Crm Roles</h1>

      <TableContainer>
        <Flex $width="100%" $justify="flex-start" $gap={10}>
          <HField style={{ flex: 1 }}>
            <H3>Actions</H3>
          </HField>
          <HField style={{ flex: 1 }}>
            <H3>Roles</H3>
          </HField>
          <HField style={{ flex: 10 }}>
            <H3>Permissions</H3>
          </HField>
        </Flex>
        <TableContent>
          {Array.from({ length: 4 }, (x) => x).map((element, index) => (
            <SkelBox key={index} style={{ height: "50px" }} />
          ))}
        </TableContent>
      </TableContainer>
    </Container>
  );
}
