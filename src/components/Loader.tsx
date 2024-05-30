import React, { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import { useDebounceValue } from "usehooks-ts";

const Container = styled.div`
  position: absolute;
  background-color: #00000011;
  margin: 10px;
  box-shadow: 0 0 10px 5px #00000011;
  backdrop-filter: blur(2px);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
`;

type Props = {};

const Loader = (props: Props) => {
  return (
    <Container>
      <ClipLoader />
    </Container>
  );
};

export default Loader;
