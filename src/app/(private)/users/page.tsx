"use client";
import { DashboardApiAgent } from "@/utils/agents/dashboardApiAgent";
import React, { Suspense, useEffect, useState } from "react";
import styled from "styled-components";
import SearchComponent from "../../../components/SearchComponent";
import Pagination from "../../../components/Pagination";
import { useQuery } from "react-query";
import { PaginatedResult, User } from "@/lib/definitions";
import Loading from "./loading";

import Ptable from "./Table";
import { QUERY_KEY } from "@/config/queryKeys";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 15px;
  & h1 {
    color: ${({ theme }) => theme.textPrimary};
  }
`;

export default function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const getUsersSearch = async (text: string) => {};

  const { status, data, isLoading } = useQuery<PaginatedResult<any>>({
    queryKey: [QUERY_KEY.getAllUsers, searchParams?.page],
    queryFn: async () => {
      return DashboardApiAgent.getAllUsers({
        page: searchParams?.page,
        limit: 11,
      }).then((res) => res.users);
    },
  });
  if (isLoading) {
    return <Loading />;
  }

  console.log(data);

  return (
    <Container>
      <h1>Users</h1>
      <SearchComponent callBack={getUsersSearch} />
      <Ptable users={data?.docs} />
      {data?.totalPages && <Pagination totalPages={data?.totalPages} />}
    </Container>
  );
}
// s
