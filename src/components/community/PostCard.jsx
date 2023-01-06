import React from "react";

export default function PostCard({ post }) {
  return (
    <li>
      <h1>{post.auth}</h1>
      <time dateTime={new Date(parseInt(post.createAt))}>timeago</time>
      <div>
        {post.imageUrl.length > 0 && (
          <img src={post.imageUrl} alt="사진" style={{ width: "100px" }} />
        )}
        <p>{post.content}</p>
      </div>
    </li>
  );
}
