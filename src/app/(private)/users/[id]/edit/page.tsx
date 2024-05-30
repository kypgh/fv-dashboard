"use client";

import { Flex } from "@/components/generic";
import { QUERY_KEY } from "@/config/queryKeys";
import { DashboardApiAgent } from "@/utils/agents/dashboardApiAgent";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;

  height: 100%;
  color: ${({ theme }) => theme.textPrimary};
`;

type Props = {};

const Page = ({ params }: { params: { id: string } }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: [QUERY_KEY.getUserId],
    queryFn: async () => {
      return DashboardApiAgent.getUserById({ _id: params.id }).then(
        (res) => res.user
      );
    },
  });

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Container>
      <Link href={"/users/655cad6089ee42468d76e7d4/posts"}>
        <p>Edit</p>
      </Link>
    </Container>
  );
};

export default Page;
