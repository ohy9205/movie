import React from "react";

export default function PostCard({ post }) {
  console.log(post);
  return (
    <li>
      포스트카드
      <h1>{post.auth}</h1>
      {/* <time>{new Date(parseInt(post.createAt))}</time> */}
      <img src={post.imageURL} alt="" style={{ width: "100px" }} />
      <p>{post.content}</p>
    </li>
  );
}
