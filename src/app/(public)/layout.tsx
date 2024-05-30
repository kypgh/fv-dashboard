"use client";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 100vh;
  padding: 10px;
  background-color: ${({ theme }) => theme.banner};
`;

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Container>{children}</Container>;
}
