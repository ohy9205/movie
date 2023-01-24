import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./PostList.module.css";

export default function PostList() {
  const postList = useSelector((state) => state.community.posts);

  // 데이터 정렬
  const getSorteList = () => {
    const list = postList && postList.length > 0 && [...postList];
    return list && list.sort((a, b) => b.createdAt - a.createdAt);
  };

  const sortedPostList = postList.length > 0 && getSorteList();

  return (
    <ul className={styles.postList}>
      <li className={styles.postInfo}>
        <p>제목</p>
        <p>작성자</p>
        <p>작성일</p>
      </li>
      {sortedPostList &&
        sortedPostList.map((post) => (
          <Link
            to={`/community/detail/${post.id}`}
            state={{ post: post }}
            key={post.id}>
            <li key={post.id} className={styles.post}>
              <p>{post.title}</p>
              <p>{post.auth}</p>
              <time
                className={styles.timeAgo}
                dateTime={new Date(
                  parseInt(post.createdAt)
                ).toLocaleDateString()}>
                {new Date(parseInt(post.createdAt))
                  .toLocaleDateString()
                  .slice(0, 11)}
              </time>
            </li>
          </Link>
        ))}
    </ul>
  );
}
