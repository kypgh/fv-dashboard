"use client";
import { DashboardApiAgent } from "@/utils/agents/dashboardApiAgent";
import React, { Suspense, useEffect, useState } from "react";
import styled from "styled-components";
import SearchComponent from "../../../../components/SearchComponent";
import Pagination from "../../../../components/Pagination";

import { useQuery } from "react-query";
import { CrmUser, PaginatedResult, User } from "@/lib/definitions";
import Loading from "./loading";
import Ptable from "./Table";
import { notFound } from "next/navigation";
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

  const { status, error, data, isLoading } = useQuery<PaginatedResult<CrmUser>>(
    {
      queryKey: [QUERY_KEY.getCrmUsers, searchParams?.page],
      queryFn: async () => {
        return DashboardApiAgent.getAllCrmUsers({
          page: searchParams?.page,
          limit: 11,
        }).then((res) => res.crmUsers);
      },
      suspense: true,
    }
  );
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return notFound();
  }

  return (
    // <Loading />
    <Container>
      <h1>Crm Users</h1>
      <SearchComponent callBack={getUsersSearch} />
      <Ptable users={data?.docs} />
      {data?.totalPages && <Pagination totalPages={data?.totalPages} />}
    </Container>
  );
}
