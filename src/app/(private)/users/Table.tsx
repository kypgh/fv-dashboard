"use client";
import GridTable from "@/components/Table/GridTable";

import { User } from "@/lib/definitions";
import React from "react";

type Props = {};

export default function Ptable({ users }: { users: User[] | undefined }) {
  const tableHeaders = ["Username", "Email", "Posts", "Followers", "Client Id"];

  return (
    <GridTable tableHeadersFlex={tableHeaders}>
      {({ Field, Nh2, LRow }) => (
        <>
          {users?.map((element: any, index) => (
            <LRow href={`users/${element._id}/posts`} key={index}>
              <Field>
                <Nh2>{`${element?.fullName}`}</Nh2>
              </Field>
              <Field>
                <Nh2>{`${element?.email}`}</Nh2>
              </Field>
              <Field>
                <Nh2>{`${element?.posts}`}</Nh2>
              </Field>
              <Field>
                <Nh2>{`${element?.followers}`}</Nh2>
              </Field>
              <Field>
                <Nh2>{`${element?._id}`}</Nh2>
              </Field>
            </LRow>
          ))}
        </>
      )}
    </GridTable>
  );
}
