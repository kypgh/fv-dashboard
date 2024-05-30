import PostThumbnail from "@/components/PostThumbnail";
import { BranchingTags, UserPost } from "@/lib/definitions";
import React from "react";

import styled from "styled-components";
const PostContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 15px;
  margin: 0 auto;
  border-radius: 8px;
  height: 100%;
  overflow: auto;
  @media only screen and (max-width: 950px) {
    justify-content: center;
  }
`;
type Props = {
  docs: any[];
  numPerRow?: number;
};

const Post = ({ docs, numPerRow }: Props) => {
  return (
    <PostContainer>
      {docs?.map((element: UserPost, _) => (
        <PostThumbnail
          key={element?._id}
          numPerRow={numPerRow}
          post={element}
        />
      ))}
    </PostContainer>
  );
};

export default Post;
