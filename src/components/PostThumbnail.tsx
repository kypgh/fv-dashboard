import React from "react";
import { Background, Flex } from "./generic";
import Image from "next/image";
import { GoPersonFill } from "react-icons/go";
import styled from "styled-components";
import { formatDate } from "@/utils/functions";
import Link from "next/link";
import { UserPost } from "@/lib/definitions";
import images from "@/config/images";
import { fontSize } from "@/config/sizes";
import { MdVerified } from "react-icons/md";

const BackgroundExtend = styled(Background)`
  background-position: center;
  height: 100%;
  max-height: 400px;
  background-color: ${({ theme }) => theme.background};
  overflow: hidden;
  padding: 5px 10px;
  border: 4px solid ${({ theme }) => theme.banner};
`;

const Title = styled.p`
  color: ${({ theme }) => theme.textPrimary};
  font-size: ${fontSize.xsm};
  font-weight: 800;
  margin-bottom: 5px;
`;

const P = styled.p`
  color: ${({ theme }) => theme.textPrimary};
  font-size: 16px;
  font-weight: 400;

  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
`;

const FlexExtend = styled(Flex)`
  height: 100%;
`;

const BottomContainer = styled(Flex)`
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
  margin-top: auto;
  padding: 10px 0;
  border-top: 2px solid ${({ theme }) => theme.banner};
`;

const AuthorContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${({ theme }) => theme.accent};
`;

const AvatarContainer = styled.div`
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.secondary};
  min-width: 30px;
  min-height: 30px;
  width: 30px;
  height: 30px;
  & svg {
    width: 100%;
    height: 100%;
    margin-top: 5px;
    color: ${({ theme }) => theme.accent};
  }
  & img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const Top = styled(Flex)`
  flex-direction: column;
  flex: 1;
  gap: 5px;

  width: 100%;
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

const BgImageContainer = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  justify-content: center;
  max-height: 100px;
  overflow: hidden;
  border-radius: 6px 6px 0 0;
`;

const Description = styled(Flex)`
  display: flex;
  margin-top: 10px;
  width: 100%;
  gap: 5px;
  flex-direction: column;
`;

type Props = {
  post: UserPost;
  numPerRow?: number;
};

const PostThumbnail = ({ post, numPerRow = 6 }: Props) => {
  console.log(
    post.description
      .split(" ")
      .filter((x) => x != "")
      .slice(0, 30)
      .join(" ")
  );

  return (
    <BackgroundExtend
      $width="100%"
      $radius={5}
      style={{
        maxWidth: `calc(100% / ${numPerRow} - 15px *  ${
          numPerRow - 1
        } /  ${numPerRow})`,
        cursor: "pointer",
        minWidth: "200px",
        // maxHeight: "350px",
      }}
    >
      <Link href={`/posts/${post._id}`}>
        <FlexExtend $direction="column" $gap={10}>
          <Top>
            <Title>{post.title}</Title>
            <BgImageContainer>
              {post.thumbnail ? (
                <Image
                  priority
                  src={post.thumbnail}
                  width={0}
                  height={0}
                  sizes="100vw"
                  alt={post.title}
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                />
              ) : (
                <Image
                  priority
                  src={images.placeholderImg}
                  width={0}
                  height={0}
                  sizes="100vw"
                  alt={post.title}
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                />
              )}
            </BgImageContainer>

            <Tags>
              {post.branchingTags?.map((element: any, index: number) => (
                <BTag key={index}>
                  <p key={index}>{element.name}</p>
                </BTag>
              ))}
              {post.symbolTags?.map((element: any, index: number) => (
                <STag key={index}>
                  <p key={index}>{element.name}</p>
                </STag>
              ))}
            </Tags>
            <Description>
              <P>{post.description}</P>
            </Description>
          </Top>
          <BottomContainer>
            <AvatarContainer>
              {post.author?.avatar ? (
                <Image
                  src={post.author?.avatar}
                  width={200}
                  height={200}
                  alt="author avatar"
                />
              ) : (
                <GoPersonFill size={30} />
              )}
            </AvatarContainer>
            <AuthorContent>
              <P>{post.author?.fullName}</P>
              {post.author?.isVerified && <MdVerified size={10} />}
            </AuthorContent>
            {/* <Bottom $gap={10}> */}
            <P>{formatDate(post.updatedAt, "dd LLL, yyyy")}</P>
          </BottomContainer>
        </FlexExtend>
      </Link>
    </BackgroundExtend>
  );
};

export default PostThumbnail;
