"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { generatePagination } from "@/utils/functions";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 5px;
`;

const SvgContainer = styled.div`
  display: flex;
  align-items: center;

  border-radius: 8px;
  & svg {
    color: ${({ theme }) => theme.textSecondary};
  }
`;

// prettier-ignore
const LinkContainer = styled(Link)<{ $isActive?: boolean; $doesNothing?: boolean; }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: ${({ $isActive, theme }) =>
    $isActive ? `1px solid ${theme.accent}` : `1px solid ${theme.textPrimary}`};
  transition: all 0.15s linear;
  color: ${({ $isActive, theme }) =>
    $isActive ? `${theme.accent}` : `${theme.textPrimary}`};
  height: 30px;
  width: 30px;
  cursor: ${({ $doesNothing }) => ($doesNothing ? "default" : "pointer")};
  &:first-child {
    border: none;
  }
  &:last-child {
    border: none;
  }
  & p {
  }

  & svg {
    color: ${({ theme }) => theme.textPrimary};
    &:hover {
      color:  ${({ theme }) => theme.accent};
    } 
  }
`;

export default function Pagination({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const paginationTable = generatePagination({
    totalPages: totalPages,
    currentPage: currentPage,
  });

  return (
    <Container>
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />

      {paginationTable.map((element, index) => (
        <React.Fragment key={index}>
          <PaginationNumber
            href={typeof element == "number" ? createPageURL(element) : ""}
            isActive={currentPage === element}
            doesNothing={typeof element == "string" && true}
          >
            <p key={index}>{element}</p>
          </PaginationNumber>
        </React.Fragment>
      ))}
      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage === totalPages}
      />
    </Container>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction?: "left" | "right";
  isDisabled?: boolean;
}) {
  const icon =
    direction === "left" ? (
      <IoIosArrowBack size={30} />
    ) : (
      <IoIosArrowBack size={30} style={{ transform: "scaleX(-1)" }} />
    );

  return isDisabled ? (
    <SvgContainer>{icon}</SvgContainer>
  ) : (
    <LinkContainer shallow={false} href={href}>
      {icon}
    </LinkContainer>
  );
}

function PaginationNumber({
  href,
  isActive,
  doesNothing,
  children,
}: {
  href: string;
  isActive?: boolean;
  doesNothing?: boolean;
  children: React.ReactNode;
}) {
  return (
    <LinkContainer
      $isActive={isActive}
      $doesNothing={doesNothing}
      shallow={false}
      href={href}
    >
      {children}
    </LinkContainer>
  );
}
