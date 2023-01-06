import React from "react";
import { useSelector } from "react-redux";
import PostCard from "./PostCard";

export default function PostList() {
  const postList = useSelector((state) => state.community.postList);
  return (
    <article>
      <h1>목록</h1>
      <ul>
        {postList &&
          postList.length > 0 &&
          postList.map((post) => <PostCard key={post.id} post={post} />)}
      </ul>
    </article>
  );
}
