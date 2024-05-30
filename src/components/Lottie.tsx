import React, { useEffect, useRef } from "react";
import lottie, { AnimationItem, LottiePlayer } from "lottie-web";
import styled from "styled-components";

const AnimationContainer = styled.div<{
  $maxWidth: string;
  $maxHeight: string;
}>`
  height: 100%;
  width: 100%;
  /* margin: auto; */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  max-width: ${({ $maxWidth }) => $maxWidth};
  max-height: ${({ $maxHeight }) => $maxHeight};
`;

function Lottie({
  path,
  maxWidth = "200px",
  maxHeight = "200px",
}: {
  path: any;
  maxWidth?: string;
  maxHeight?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const instance = lottie.loadAnimation({
        container: ref.current, // the dom element that will contain the animation
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: path,
      });
      return () => instance.destroy();
    }
  }, [ref.current]);

  return (
    <AnimationContainer $maxHeight={maxHeight} $maxWidth={maxWidth} ref={ref} />
  );
}

export default Lottie;
