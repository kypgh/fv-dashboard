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
  height: 600px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
`;
const HField = styled.div`
  display: flex;
  width: calc(100% / 3);
  padding: 10px;
  flex: 1;
  min-height: 20px;
  border-radius: 8px;
  background-color: transparent;
`;

const H3Extend = styled(H3)`
  color: ${({ theme }) => theme.textPrimary};
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

type Props = {
  title: string;
  headers: string[];
};

export default function TableSkeleton({ title, headers }: Props) {
  return (
    <Container>
      <h1>{title}</h1>
      <SkelBox style={{ width: "550px", height: "35px" }} />
      <TableContainer>
        <Flex $width="100%" $justify="flex-start" $gap={10}>
          {headers.map((header, index) => (
            <HField key={index}>
              <H3Extend>{header}</H3Extend>
            </HField>
          ))}
        </Flex>
        <TableContent>
          {Array.from({ length: 11 }, (x) => x).map((element, index) => (
            <SkelBox key={index} style={{ height: "42px" }} />
          ))}
        </TableContent>
      </TableContainer>
      <SkelBox style={{ height: "35px", width: "500px", margin: "0 auto" }} />
    </Container>
  );
}
