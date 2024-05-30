"use client";

import React from "react";
import TestTable, { columnInterface } from "@/components/Table/TestTable";
import { useQuery } from "react-query";
import { PaginatedResult } from "@/lib/definitions";
import { QUERY_KEY } from "@/config/queryKeys";
import { DashboardApiAgent } from "@/utils/agents/dashboardApiAgent";
import useTableQuery from "@/utils/hooks/useTableQuery";

type Props = {};

const page = (props: Props) => {
  const testColumns: columnInterface[] = [
    {
      key: "fullName",
      label: "Name",
      isHidden: false,
      size: "minmax(100px, 1fr)",
    },
    {
      key: "email",
      label: "Email",
      isHidden: false,
      size: "minmax(100px, 1fr)",
    },
    {
      key: "posts",
      label: "Posts",
      isHidden: false,
      size: "minmax(100px, 1fr)",
    },
    {
      key: "followers",
      label: "Followers",
      isHidden: false,
      size: "minmax(100px, 1fr)",
    },
    {
      key: "_id",
      label: "Client ID",
      isHidden: false,
      size: "minmax(100px, 1fr)",
    },
  ];

  const { data, columns, toggleColumn, changeSize } = useTableQuery(
    [QUERY_KEY.getAllUsers],
    async () => {
      return DashboardApiAgent.getAllUsers({
        page: "1",
        limit: 11,
      }).then((res) => res.users);
    },
    { availableColumns: testColumns }
  );

  return (
    <>
      <TestTable data={data?.docs || []} columns={columns} />
      <button onClick={() => toggleColumn("_id")}>test</button>
    </>
  );
};

export default page;
