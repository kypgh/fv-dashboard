"use client";
import React from "react";
import SkelBox from "@/components/Skeleton/SkelBox";

type Props = {};

const Loading = (props: Props) => {
  return (
    <SkelBox
      style={{
        maxWidth: "100%",
        height: "100%",
      }}
    />
  );
};

export default Loading;
