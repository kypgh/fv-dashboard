"use client";

import React from "react";
import styled from "styled-components";

type CellProps = {
  $size?: string;
};

// lol

const TableContainer = styled.div`
  display: grid;
  grid-template-areas:
    "header header"
    "body body";
  border: 1px solid #ddd;
  overflow: hidden;
`;

const TableHeader = styled.div`
  grid-area: header;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
`;

const TableBody = styled.div`
  grid-area: body;
  display: grid;
  /* grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); */
  grid-auto-rows: minmax(40px, auto);
`;

const TableRow = styled.div`
  display: flex;
  width: 100%;
`;

// prettier-ignore
const HeaderCell = styled.div.attrs<CellProps>(({ $size = 'minmax(100px, 1fr)' }) => ({ $size }))
`
  background-color: #f2f2f2;
  font-weight: bold;
  color: #111;
  padding: 5px 8px;
  width: 100%;
`;

// prettier-ignore
const TableCell = styled.div.attrs<CellProps>(({ $size = 'minmax(100px, 1fr)' }) => ({ $size }))
`
  padding: 8px;
  border-bottom: 1px solid #ddd;
  width: 100%;
`;

export interface columnInterface {
  isHidden?: boolean | undefined;
  label: string;
  key: string;
  size?: string;
  // [key: string]: any;
}

type Props = {
  data: any;
  columns: columnInterface[];
};

const TestTable = ({ data, columns }: Props) => {
  const gridTemplateColumns = columns
    .filter((col) => !col.isHidden)
    .map((col) => col.size || "minmax(100px, 1fr)")
    .join(" ");

  console.log(gridTemplateColumns);

  return (
    <TableContainer>
      <TableHeader
        style={
          {
            // gridTemplateColumns,
          }
        }
      >
        {columns.map(
          (el) =>
            !el?.isHidden && (
              <HeaderCell $size={el.size} key={el.key}>
                {el.label}
              </HeaderCell>
            )
        )}
      </TableHeader>
      <TableBody
        style={
          {
            // gridTemplateColumns,
          }
        }
      >
        {data.map((row: any, idx: any) => (
          <TableRow key={idx}>
            {columns.map(
              (col, i) =>
                !col?.isHidden && (
                  <TableCell $size={col.size} key={i}>
                    {row[col.key]}
                  </TableCell>
                )
            )}
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>
  );
};

export default TestTable;
