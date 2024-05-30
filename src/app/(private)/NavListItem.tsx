"use client";
import { CustomLink, Flex } from "@/components/generic";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";

const Outer = styled(Flex)`
  width: 100%;
  padding: 10px;
  position: relative;
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

const Parent = styled(Flex)<{ $isActive: boolean }>`
  gap: 10px;
  font-size: 18;
  font-weight: 600;
  width: 100%;
  /* position: relative; */
  cursor: pointer;
  color: ${({ $isActive, theme }) => ($isActive ? theme.accent : "")};
`;

const fadeIn = keyframes`
0% {
  height: 100%;
  max-height: 0px;
}
100% {
  
    height: 100%;
    max-height: 250px;
  
  }
`;
const fadeOut = keyframes`
0% {
  
  height: 100%;
    max-height: 250px;
  }

100% {
  height: 100%;
  max-height: 0px;
  
  }

`;

const ExpandableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% + 40px);
  margin-left: -30px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.background};
  &.close {
    animation: ${fadeOut} 0.25s linear forwards;
  }

  &.open {
    animation: ${fadeIn} 0.45s linear forwards;
  }
`;

type Sublink = {
  title: React.ReactNode;
  href: string;
  icon: React.ComponentType<any>;
  linkIsActive?: boolean;
};

type Props = {
  title: React.ReactNode;
  icon?: React.ComponentType<any>;
  href?: string;
  children?: Sublink[];
};

const NavListItem = ({
  title,
  icon: Icon,
  href = "",
  children = [],
}: Props) => {
  const asPath = usePathname();
  const linkIsActive = asPath === href;

  const hasChildren = children.length > 0;

  const [isExtend, setIsExtend] = useState(asPath.includes(href));

  const [isAnimatingIn, setisAnimatingIn] = useState(asPath.includes(href));

  return (
    <Outer>
      {linkIsActive && <Indicator />}
      {!hasChildren ? (
        <CustomLink
          href={href}
          style={{
            display: "contents",
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          <Flex $width="100%" $gap={10} $align="center" $pl={20}>
            {Icon && <Icon />}
            {title}
          </Flex>
        </CustomLink>
      ) : (
        <Flex
          $width="100%"
          $gap={10}
          $align="flex-start"
          $pl={20}
          $direction="column"
        >
          <Parent
            $isActive={asPath.includes(href)}
            onClick={() => {
              setIsExtend(!isExtend);
              setisAnimatingIn(true);
            }}
          >
            {Icon && <Icon />}
            {title}
          </Parent>
          {isAnimatingIn && (
            <ExpandableContainer
              className={isExtend ? "open" : "close"}
              onAnimationEnd={() => !isExtend && setisAnimatingIn(false)}
            >
              {children?.map((element: any) => (
                <NavListItemChildren
                  key={element.title}
                  {...element}
                  href={`${href}${element.href}`}
                />
              ))}
            </ExpandableContainer>
          )}
        </Flex>
      )}
    </Outer>
  );
};

const NavListItemChildren = ({ title, icon: Icon, href = "" }: Sublink) => {
  const asPath = usePathname();

  const linkIsActive = asPath === href;

  return (
    <Outer
      style={{
        paddingLeft: 30,
      }}
    >
      {linkIsActive && <Indicator />}
      <CustomLink
        href={href}
        style={{
          display: "contents",
          fontSize: 16,
          fontWeight: 600,
        }}
      >
        <Flex $width="100%" $gap={10} $align="center" $pl={20}>
          {Icon && <Icon />}
          {title}
        </Flex>
      </CustomLink>
    </Outer>
  );
};

export default NavListItem;
