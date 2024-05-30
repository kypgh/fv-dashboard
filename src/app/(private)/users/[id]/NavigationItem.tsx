"use client";
import { Flex } from "@/components/generic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import styled from "styled-components";

const Outer = styled(Link)<{ $linkIsActive: boolean }>`
  padding: 10px;
  position: relative;
  border-radius: 8px 8px 0 0;
  color: ${({ theme }) => theme.textPrimary};
  background-color: ${({ $linkIsActive, theme }) =>
    $linkIsActive ? theme.banner : theme.background};
  border: 2px solid ${({ theme }) => theme.banner};
  border-bottom: none;
  font-size: 18;
  font-weight: 600;
  &:hover {
    background: ${({ $linkIsActive, theme }) =>
      $linkIsActive
        ? ""
        : `linear-gradient(90deg, ${theme.banner}90 0%, ${theme.accent}00 100%)`};
  }
`;

const Indicator = styled.div`
  height: 20px;
  width: 5px;
  border-radius: 0 5px 5px 0;
  background-color: ${({ theme }) => theme.accent};
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
`;

const CustomLinkExtend = styled(Link)`
  text-decoration: none;
`;

type Sublink = {
  title: React.ReactNode;
  href: string;
  icon: React.ComponentType<any>;
  linkIsActive?: boolean;
};

type Props = {
  title: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
  children?: Sublink[];
};

const NavigationItem = ({ title, icon: icon, href = "" }: Props) => {
  const asPath = usePathname();
  const linkIsActive = asPath.includes(href);

  const newPath = asPath
    .split("/")
    .slice(0, asPath.split("/").length - 1)
    .join("/");

  return (
    <Outer $linkIsActive={linkIsActive} href={newPath + href}>
      <Flex $width="100px" $gap={10} $align="center" $pl={20}>
        {icon && icon}
        {title}
      </Flex>
    </Outer>
  );
};

export default NavigationItem;
