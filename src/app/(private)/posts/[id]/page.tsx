"use client";
import { Container, Flex } from "@/components/generic";
import { H2, H3 } from "@/components/typography";
import { MdVerified } from "react-icons/md";
import { DashboardApiAgent } from "@/utils/agents/dashboardApiAgent";
import { formatDate } from "@/utils/functions";
import Image from "next/image";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { Sections, UserPost } from "@/lib/definitions";
import parse from "html-react-parser";
import { notFound } from "next/navigation";
import Loading from "./loading";
import { QUERY_KEY } from "@/config/queryKeys";
import { socialLinksData } from "@/config/socialLinks";
import Link from "next/link";
import { GoPersonFill } from "react-icons/go";
const ContainerExtend = styled(Container)`
  border-radius: 15px;
  max-width: 100%;
  overflow: auto;
  height: 100%;
`;

const AuthorContainer = styled(Flex)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 5px 0;
  border-bottom: 2px solid ${({ theme }) => theme.background};
`;

const AuthorName = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  & svg {
    color: ${({ theme }) => theme.accent};
  }
`;

const AuthorContent = styled.div`
  width: 100%;
  gap: 5px;
  display: flex;
  flex-direction: column;
`;

const AvatarContainer = styled.div`
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.secondary};
  min-width: 50px;
  min-height: 50px;
  width: 50px;
  height: 50px;
  & img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  & svg {
    width: 100%;
    height: 100%;
    margin-top: 5px;
    color: ${({ theme }) => theme.accent};
  }
`;

const Tags = styled(Flex)`
  display: flex;
  gap: 5px;
  width: 100%;
  font-size: 14px;
  & p {
    color: ${({ theme }) => theme.white};
  }
`;

const BTag = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.black};
  border-radius: 8px;
  padding: 5px;
  max-width: 100px;
  justify-content: center;
`;

const STag = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.accent};
  border-radius: 8px;
  padding: 5px;
  max-width: 100px;
  justify-content: center;
`;

const P = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 14px;
  font-weight: 400;
`;

const SectionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 5px;
  margin-top: 10px;
  color: ${({ theme }) => theme.textPrimary};
  p {
    font-size: 14px;
    font-weight: 400;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  padding: 5px 0;
  & img {
    object-fit: contain;
  }
  & p {
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.textPrimary};
  }
`;

const SocialLink = styled(Link)<{ $color: string }>`
  display: flex;
  width: fit-content;
  justify-content: center;
  align-items: center;
  gap: 5px;
  flex-direction: column;
  justify-content: center;
  color: ${({ $color }) => $color};
`;

type Props = {};

const Page = ({ params }: { params: { id: string } }) => {
  const { data, isLoading, error, isError, refetch } = useQuery<UserPost>({
    queryKey: [QUERY_KEY.getPostId],
    queryFn: async () =>
      DashboardApiAgent.getPostById({ _id: params.id }).then((res) => {
        return res.post;
      }),
    cacheTime: 1,
  });

  useEffect(() => {
    if (isError) {
      refetch();
    }
  }, [isError, refetch]);

  if (error) {
    notFound();
  }
  if (isLoading) return <Loading />;

  return (
    <ContainerExtend $background={(theme) => theme.banner} $pall={15}>
      <Flex $direction="column" $gap={5}>
        <H2 $color={(theme) => theme.textPrimary}>{data?.title}</H2>
        <AuthorContainer>
          <AuthorName>
            <AvatarContainer>
              {data?.author?.avatar ? (
                <Image
                  src={data?.author.avatar}
                  width={200}
                  height={200}
                  alt={data?.author.fullName}
                />
              ) : (
                <GoPersonFill size={30} />
              )}
            </AvatarContainer>
            <H3 $color={(theme) => theme.textPrimary}>
              {data?.author?.fullName || data?.author?.userName}
            </H3>
            {data?.author?.isVerified && <MdVerified size={15} />}
          </AuthorName>
          <AuthorContent>
            <P>
              {formatDate(data?.updatedAt ?? "", "dd LLLL, yyyy | h:mm a ")}
            </P>
          </AuthorContent>
          <Tags>
            {data?.branchingTags?.map((element: any, index: number) => (
              <BTag key={index}>
                <p key={index}>{element.name}</p>
              </BTag>
            ))}
            {data?.symbolTags?.map((element: any, index: number) => (
              <STag key={index}>
                <p key={index}>{element.name}</p>
              </STag>
            ))}
          </Tags>
        </AuthorContainer>
        <SectionsContainer>{parse(data?.content ?? "")}</SectionsContainer>
        <LinksContainer>
          <P>Visit me on:</P>
          {data?.links?.map(
            ({ name, link }: { name: string; link: string }, index: number) => {
              const { Icon, name: iconName, color } = socialLinksData[name];
              return (
                <SocialLink href={link} $color={color} key={index}>
                  <Icon />
                  {iconName}
                </SocialLink>
              );
            }
          )}
          {/* {socialLinksData[data?.links]} */}
        </LinksContainer>
      </Flex>
    </ContainerExtend>
  );
};

export default Page;
