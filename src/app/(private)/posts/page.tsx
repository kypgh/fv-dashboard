"use client";

import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { DashboardApiAgent } from "@/utils/agents/dashboardApiAgent";
import styled from "styled-components";
import Pagination from "@/components/Pagination";
import SearchComponent from "@/components/SearchComponent";
import Post from "./Post";
import { PaginatedResult, UserPost } from "@/lib/definitions";
import Loading from "./loading";
import { QUERY_KEY } from "@/config/queryKeys";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 10px;
  & h1 {
    color: ${({ theme }) => theme.textPrimary};
  }
`;

const Page = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const { status, data, isLoading, error } = useQuery<
    PaginatedResult<UserPost>
  >({
    queryKey: [QUERY_KEY.getAllPosts, searchParams?.page || 1],
    queryFn: async () => {
      return DashboardApiAgent.getAllPosts({
        page: searchParams?.page,
        limit: 15,
      }).then((res) => res.posts);
    },
    suspense: false,
  });

  const getPostsSearch = async (text: string) => {};

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <h1>Posts</h1>
      <SearchComponent callBack={getPostsSearch} />
      <Post docs={data?.docs || []} numPerRow={5} />
      {data?.totalPages && <Pagination totalPages={data?.totalPages} />}
    </Container>
    // <Loading />
  );
};

export default Page;
