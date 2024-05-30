"use client";

import { Flex } from "@/components/generic";
import { DashboardApiAgent } from "@/utils/agents/dashboardApiAgent";
import Link from "next/link";
import React, { Suspense, useEffect } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import Navigation from "../Navigation";
import Loading from "./loading";
import { formatDate } from "@/utils/functions";
import NotFoundPage from "../../not-found";
import { notFound } from "next/navigation";
import { QUERY_KEY } from "@/config/queryKeys";

const Container = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-areas: "leftChild rightChild";
  grid-template-columns: minmax(200px, 200px) minmax(200px, 2fr);
  gap: 5px;
`;

const LeftContainer = styled.div`
  display: flex;
  width: 100%;
  border: 4px solid ${({ theme }) => theme.banner};
  grid-area: leftChild;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  font-weight: bold;

  background-color: ${({ theme }) => theme.banner};
  border-bottom: 2px solid ${({ theme }) => theme.background};
  & p {
    color: ${({ theme }) => theme.textPrimary};
  }
`;

const LeftBody = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.background};
  align-items: stretch;
`;

const ClientInfo = styled.div`
  display: flex;
  flex-direction: column;

  gap: 5px;
  width: 100%;
  overflow: hidden;
  padding: 10px;
  /* background-color: ${({ theme }) => theme.banner}; */
  font-size: 14px;
`;

const P = styled.p`
  color: ${({ theme }) => theme.textPrimary};
  word-wrap: break-word;
`;

const RightContainer = styled(Flex)`
  display: grid;
  width: 100%;
  height: 100%;
  grid-area: rightChild;
  grid-template-areas:
    "upperC upperC"
    "underC underC";
  grid-template-columns: 1fr;
  grid-template-rows: minmax(35px, 35px) 1fr;
  border-radius: 8px;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  display: flex;
  border: 4px solid ${({ theme }) => theme.banner};
  background-color: ${({ theme }) => theme.background};
  padding: 10px;
  grid-area: underC;
  height: 100%;
  overflow: hidden;
  border-radius: 0 0 8px 8px;
`;
export default function PrivateLayout({
  params,
  children,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: [QUERY_KEY.getUserId, params.id],
    queryFn: async () => {
      return DashboardApiAgent.getUserById({ _id: params.id }).then(
        (res) => res.user
      );
    },
  });

  useEffect(() => {
    if (isError) {
      refetch();
    }
  }, [isError, refetch]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return notFound();
  }

  return (
    <Container>
      <LeftContainer>
        <Header>
          <p>Client Info</p>
        </Header>
        <LeftBody>
          <ClientInfo>
            <P>Email:</P>
            <P>{data.email}</P>
          </ClientInfo>
          <ClientInfo>
            <P>Name:</P>
            <P>{data.fullName}</P>
          </ClientInfo>
          <ClientInfo>
            <P>Joined:</P>
            <P>{formatDate(data.createdAt, "dd LLLL, yyyy")}</P>
          </ClientInfo>
          <ClientInfo>
            <P>Description:</P>
            <P>{data.description}</P>
          </ClientInfo>
        </LeftBody>
        <Header>
          <p>Links</p>
        </Header>
        <LeftBody>
          {data.socialMediaLinks?.map(
            (
              element: { _id: string; link: string; name: string },
              index: number
            ) => (
              <ClientInfo>
                <Link href={element?.link}>
                  <P>{element.name}</P>
                </Link>
              </ClientInfo>
            )
          )}
        </LeftBody>
      </LeftContainer>

      <Suspense fallback={<Loading />}>
        <RightContainer>
          <Navigation />
          <ContentContainer>{children}</ContentContainer>
        </RightContainer>
      </Suspense>
    </Container>
  );
}
