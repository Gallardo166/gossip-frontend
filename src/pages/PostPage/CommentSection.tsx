import { useContext, useState } from "react";
import { CommentType } from "../../types/Comment";
import Comment from "./Comment";
import { AuthContext } from "../../contexts";
import { postProtected } from "../../utils/fetchFunctions";
import { getDate } from "../../utils/formatDate";
import { useParams } from "react-router";

type CommentSectionProps = {
  commentCount: number,
  comments: CommentType[] | null
}

const CommentSection = ({commentCount, comments}: CommentSectionProps) => {
  const [isCommenting, setIsCommenting] = useState(false);
  const [comment, setComment] = useState("");
  const { user, token } = useContext(AuthContext);
  const { id } = useParams();

  function handleComment() {
    const data = {
      body: comment,
      postId: Number(id),
      date: getDate(),
    };
    postProtected("http://localhost:3000/comment", token, data);
    location.reload();
  }

  return (
    <div>
      <p>Comments {commentCount}</p>
      {comments?.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
      {user && token
          ? isCommenting
            ? <div>
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleComment();
                  }}
                />
                <button
                  onClick={handleComment}>
                  Submit
                </button>
              </div>
            : <button onClick={() => setIsCommenting(true)}>Comment</button>
          : null}
    </div>
  )
}

export default CommentSection;