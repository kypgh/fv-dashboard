"use client";

import styled from "styled-components";
import notFound from "@/assets/animation/404.json";
import Lottie from "@/components/Lottie";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type Props = {};

const NotFoundPage = (props: Props) => {
  return (
    <Container>
      <Lottie path={notFound} maxWidth={"50%"} maxHeight={"50%"} />
    </Container>
  );
};

export default NotFoundPage;
