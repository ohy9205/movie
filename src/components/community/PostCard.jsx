import React, { useState } from "react";
import { useAuthContext } from "../../store/AuthContext";
import Button from "../ui/Button";
import PostEditModal from "./PostEditModal";
import PostMenuModal from "./PostMenuModal ";

export default function PostCard({ post }) {
  const [positon, setPosition] = useState();
  const { user } = useAuthContext();
  const [showMenu, setShowMenu] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const toggleShowMenue = () => {
    setShowMenu((showMenu) => !showMenu);
  };

  const toggleShowEdit = () => {
    setShowMenu(false);
    setShowEdit((showEdit) => !showEdit);
  };

  const toggleShowDelete = () => {
    setShowMenu(false);
    setShowDelete((showDelete) => !showDelete);
  };

  const getPosition = (e) => {
    if (e.target.nodeName !== "BUTTON") return;
    const rect = e.target.getBoundingClientRect();
    setPosition({ y: rect.top, x: rect.left });
  };

  return (
    <li>
      <div style={{ display: "flex" }}>
        <h1>{post.auth}</h1>
        <div onClick={getPosition}>
          {user.email === post.auth && !showMenu && (
            <Button text="..." onClick={toggleShowMenue} />
          )}
          {showEdit && (
            <PostEditModal onClose={toggleShowEdit} post={post} isEdit />
          )}
          {showDelete && (
            <PostEditModal
              onClose={toggleShowDelete}
              postId={post.id}
              post={post}
            />
          )}
          {showMenu && (
            <div>
              <PostMenuModal
                onClose={toggleShowMenue}
                onEdit={toggleShowEdit}
                onDelete={toggleShowDelete}
                position={positon}
              />
            </div>
          )}
        </div>
      </div>
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
