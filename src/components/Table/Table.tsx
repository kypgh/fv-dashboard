"use client";
import { Flex } from "@/components/generic";
import { H3 } from "@/components/typography";
import { fontSize } from "@/config/sizes";

import React, { ReactElement } from "react";
import styled from "styled-components";

const TableContainer = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
  border-radius: 8px;
  max-width: calc(100vw - 300px);
  overflow: auto;
  height: 100%;
  &::-webkit-scrollbar {
    height: 10px;
  }
`;

const Headers = styled.div`
  display: flex;
  width: 100%;
`;

const TableContent = styled.div`
  overflow: auto;
  width: 100%;
  min-width: fit-content;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Row = styled(Flex)`
  gap: 10px;
  width: 100%;
  color: ${({ theme }) => theme.textPrimary};
  background-color: ${({ theme }) => theme.banner};
  border-bottom: 1px solid transparent;
  &:hover {
    border-bottom: 1px solid ${({ theme }) => theme.accent};
  }
`;

interface FieldProps {
  $flex?: number;
  $length: number;
}

const Field = styled.div<FieldProps>`
  display: flex;
  gap: 20px;
  min-width: 250px;
  width: ${({ $length }) => `calc(100% / ${$length})`};
  padding: 10px;
  flex: ${({ $flex }) => $flex};
`;

const Nh2 = styled.p`
  font-size: ${fontSize.xxsm};
`;

type HeaderChild = {
  value: string;
  flexSize: number;
};

export default function Table({
  headers,
  children,
}: {
  headers: HeaderChild[];

  children?: (props: {
    Row: typeof Row;
    Field: (props: {
      children: React.ReactNode;
      $flex?: number;
    }) => ReactElement<FieldProps>;
    Nh2: typeof Nh2;
  }) => JSX.Element;
}) {
  return (
    <TableContainer>
      <Headers>
        <Flex $width="100%" $justify="flex-start" $gap={10}>
          {headers.map((element: HeaderChild, index) => (
            <Field
              key={index}
              $flex={element.flexSize}
              $length={headers.length}
            >
              <H3 $color={(theme) => theme.textPrimary}>{element.value}</H3>
            </Field>
          ))}
        </Flex>
      </Headers>

      <TableContent>
        {children &&
          children({
            Row,
            Field: ({ children, ...props }) => (
              <Field $flex={1} $length={headers.length} {...props}>
                {children}
              </Field>
            ),
            Nh2,
          })}
      </TableContent>
    </TableContainer>
  );
}
