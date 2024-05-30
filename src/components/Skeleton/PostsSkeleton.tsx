"use client";
import SkelBox from "@/components/Skeleton/SkelBox";
import { Flex } from "@/components/generic";
import { H3 } from "@/components/typography";
import React from "react";
import styled from "styled-components";

const TableContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 15px;
  margin: 0 auto;
  padding: 10px;
  /* border: 4px solid ${({ theme }) => theme.banner}; */
  border-radius: 8px;

  overflow: hidden;
`;

export default function PostsSkeleton({
  length = 15,
  numPerRow = 5,
}: {
  length?: number;
  numPerRow?: number;
}) {
  return (
    <TableContainer>
      {Array.from({ length: length }, (x) => x).map((element, index) => (
        <SkelBox
          key={index}
          style={{
            maxWidth: `calc(100% / ${numPerRow} - 15px * ${
              numPerRow - 1
            } / ${numPerRow})`,
            height: "400px",
            maxHeight: "calc(50% - 20px)",
            minWidth: "200px",
          }}
        />
      ))}
    </TableContainer>
  );
}
