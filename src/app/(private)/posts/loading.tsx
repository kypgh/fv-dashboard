"use client";
import styled from "styled-components";
import PostsSkeleton from "../../../components/Skeleton/PostsSkeleton";
import SkelBox from "@/components/Skeleton/SkelBox";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 15px;
  & h1 {
    color: ${({ theme }) => theme.textPrimary};
  }
`;

const TableContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 15px;
  margin: 0 auto;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.primary};
  height: 100%;
  overflow: hidden;
`;

export default function Loading() {
  return (
    <Container>
      <h1>Posts</h1>
      <SkelBox style={{ width: "550px", height: "60px" }} />
      <PostsSkeleton />
      <SkelBox style={{ height: "60px", width: "500px", margin: "0 auto" }} />
    </Container>
  );
}
