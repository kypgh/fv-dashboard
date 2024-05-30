import { fontSize } from "@/config/sizes";
import React from "react";
import styled from "styled-components";
import { Flex } from "../generic";
import Link from "next/link";
import { H2, H3 } from "../typography";

const TContainer = styled.div<{ $length: number }>`
  display: grid;

  grid-template-columns: repeat(
    ${({ $length }) => $length},
    minmax(min-content, auto)
  );
  row-gap: 2px;
  color: ${({ theme }) => theme.textPrimary};

  position: relative;
  overflow: auto;
  max-width: calc(100vw - 250px - 70px);
  padding: 0 5px;
`;

const HField = styled.div`
  display: flex;
  gap: 20px;
  padding: 10px;
  background-color: ${({ theme }) => theme.background};
`;

const Nh3 = styled(H3)`
  color: ${({ theme }) => theme.textPrimary};
`;
const HRow = styled.div`
  display: contents;
  position: sticky;
  top: 0;

  > ${HField} {
    position: sticky;
    top: 0;
  }
`;

const Field = styled.div`
  display: flex;
  gap: 20px;
  padding: 10px;
  background: ${({ theme }) => theme.banner};
  border-bottom: 1px solid transparent;
`;

const Nh2 = styled.p`
  font-size: ${fontSize.xxsm};
`;

const TableContent = styled.div`
  display: contents;
`;

const LRow = styled(Link)`
  display: contents;
  > ${Field} {
    &:first-child {
      border-radius: 8px 0px 0px 8px;
    }
    &:last-child {
      border-radius: 0px 8px 8px 0px;
    }
  }
  &:hover > ${Field} {
    border-bottom: 1px solid ${({ theme }) => theme.accent};
  }
`;

const Row = styled.div`
  display: contents;
  > ${Field} {
    &:first-child {
      border-radius: 8px 0px 0px 8px;
    }
    &:last-child {
      border-radius: 0px 8px 8px 0px;
    }
  }
  &:hover > ${Field} {
    border-bottom: 1px solid ${({ theme }) => theme.accent};
  }
`;

type Props = {
  tableHeadersFlex: string[];
  children?: (props: {
    LRow: typeof LRow;
    Row: typeof Row;
    Field: typeof Field;
    Nh2: typeof Nh2;
  }) => JSX.Element;
};

const GridTable = ({ tableHeadersFlex, children }: Props) => {
  return (
    <TContainer $length={tableHeadersFlex.length}>
      {tableHeadersFlex.map((element, index) => (
        <HRow key={index}>
          <HField key={index}>
            <Nh3>{element}</Nh3>
          </HField>
        </HRow>
      ))}
      <TableContent>
        {children &&
          children({
            Row,
            LRow,
            Field,
            Nh2,
          })}
      </TableContent>
    </TContainer>
  );
};

export default GridTable;
