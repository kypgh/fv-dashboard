"use client";
import SkelBox from "@/components/Skeleton/SkelBox";
import { Flex } from "@/components/generic";
import styled from "styled-components";

const AuthorContainer = styled(Flex)`
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
`;

const AuthorContent = styled.div`
  width: 100%;
  gap: 5px;
  display: flex;
  flex-direction: column;
`;

export default function Skeleton() {
  return (
    <Flex $direction="column" $gap={10}>
      <SkelBox
        style={{
          maxWidth: "500px",
          height: "40px",
        }}
      />
      <AuthorContainer>
        <SkelBox
          style={{
            maxWidth: "50px",
            height: "50px",
            borderRadius: "50%",
          }}
        />
        <AuthorContent>
          <SkelBox
            style={{
              maxWidth: "500px",
              height: "30px",
            }}
          />
          <SkelBox
            style={{
              maxWidth: "500px",
              height: "30px",
            }}
          />
        </AuthorContent>
      </AuthorContainer>
      {Array.from({ length: 3 }).map((_, index: number) => (
        <SkelBox
          key={index}
          style={{
            maxWidth: "calc(100%)",
            height: "200px",
          }}
        />
      ))}
    </Flex>
  );
}
