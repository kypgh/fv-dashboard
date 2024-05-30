"use client";

import Post from "@/app/(private)/posts/Post";
import { DashboardApiAgent } from "@/utils/agents/dashboardApiAgent";
import React, { Suspense } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import Loading from "./loading";
import Pagination from "@/components/Pagination";
import { PaginatedResult } from "@/lib/definitions";
import { notFound } from "next/navigation";
import { QUERY_KEY } from "@/config/queryKeys";
import Lottie from "@/components/Lottie";
import EmptyAnimation from "@/assets/animation/emptyAnim.json";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 10px;

  color: ${({ theme }) => theme.textPrimary};
`;

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

type Props = {};

const Page = ({
  params,
  searchParams,
}: {
  params: { query?: string; page?: string; id: string };
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const { data, error, isLoading } = useQuery<PaginatedResult<any>>({
    queryKey: [QUERY_KEY.getUserPosts, searchParams?.page],
    queryFn: async () => {
      return DashboardApiAgent.getAllPosts({
        limit: 8,
        user_id: params.id,
        page: searchParams?.page,
      }).then((res) => res.posts);
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return notFound();
  }

  return (
    <Container>
      {data?.docs && data?.docs?.length > 0 ? (
        <>
          <Post docs={data?.docs || []} numPerRow={4} />
          <Pagination totalPages={data?.totalPages || 1} />
        </>
      ) : (
        <EmptyContainer>
          <Lottie path={EmptyAnimation} maxHeight="200px" maxWidth="200px" />
          <p>User has no published Posts</p>
        </EmptyContainer>
      )}
    </Container>
  );
};

export default Page;
