import React from "react";
import { useSelector } from "react-redux";
import PostCard from "./PostCard";

export default function PostList() {
  const postList = useSelector((state) => state.community.posts);

  // 데이터 정렬
  const getSorteList = () => {
    const list = postList && postList.length > 0 && [...postList];
    return list && list.sort((a, b) => b.createdAt - a.createdAt);
  };

  const sortedPostList = postList.length > 0 && getSorteList();

  return (
    <section>
      <h1>목록</h1>
      <div>
        {sortedPostList &&
          sortedPostList.map((post) => <PostCard key={post.id} post={post} />)}
      </div>
    </section>
  );
}
