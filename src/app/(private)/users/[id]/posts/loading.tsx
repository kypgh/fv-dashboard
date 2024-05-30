"use client";
import PostsSkeleton from "@/components/Skeleton/PostsSkeleton";
import SkelBox from "@/components/Skeleton/SkelBox";
import React from "react";
import styled from "styled-components";

type Props = {};

const ContainerOuter = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 5px;
  /* background-color: ${({ theme }) => theme.primary}; */
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;

  gap: 15px;
  margin: 0 auto;

  height: 100%;
`;
export default function Loading({}: Props) {
  return (
    <ContainerOuter>
      <Container>
        <PostsSkeleton length={8} numPerRow={4} />
      </Container>
      <SkelBox style={{ height: "35px", width: "500px", margin: "0 auto" }} />
    </ContainerOuter>
  );
}
