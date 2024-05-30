import React from "react";
import styled, { keyframes } from "styled-components";

const shine = keyframes`
  to {
	/* transform: translateX(150%); */
    left: 110%;
    }
`;

const SkeletonBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.textSecondary};
  border-radius: 8px;
  &::after {
    content: "";
    position: absolute;
    left: -20%;
    background: ${({ theme }) =>
      `linear-gradient(90deg, ${theme.textSecondary}00 0%, ${theme.textSecondary}00 25%, ${theme.banner}33 50%, ${theme.textSecondary}00 75%, ${theme.textSecondary}00 100%)`};
    width: 100%;
    max-width: 20%;
    height: 100%;
    /* transform: translateX(-100%); */
    /* filter: blur(30px); */
    animation: ${shine} 1s infinite;
  }
`;

type Props = {
  style?: React.CSSProperties;
};

const SkelBox = (props: Props) => {
  return <SkeletonBox style={props.style}></SkeletonBox>;
};

export default SkelBox;
