import React, { useState } from "react";
import styled from "styled-components";
import navData from "./[id]/navData";
import NavigationItem from "./[id]/NavigationItem";

const TabsContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 5px;
  grid-area: upperC;
  height: 100%;
`;

type Props = {};

export default function Navigation({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  return (
    <TabsContainer>
      {navData.map((element: { href: string; title: string }, _) => (
        <NavigationItem key={element.href} {...element} />
      ))}
    </TabsContainer>
  );
}
