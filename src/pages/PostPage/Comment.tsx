import { useContext, useState } from "react";
import { CommentType } from "../../types/Comment";
import { fetchData, postProtected } from "../../utils/fetchFunctions";
import { AuthContext } from "../../contexts";
import { useParams } from "react-router";
import { getDate } from "../../utils/formatDate";

type CommentProps = {
  comment: CommentType
}

const Comment = ({ comment }: CommentProps) => {
  const [replies, setReplies] = useState<CommentType[] | null>(null);
  const [isReplying, setIsReplying] = useState(false);
  const [reply, setReply] = useState("");
  const { user, token } = useContext(AuthContext);
  const { id } = useParams();
  console.log(comment);

  function handleReply() {
    const data = {
      body: reply,
      parentId: Number(comment.id),
      postId: Number(id),
      date: getDate(),
    };
    postProtected(`http://localhost:3000/comment?parentId=${comment.id}`, token, data);
    location.reload();
  }

  return (
    <div>
      <p>{comment.username}</p>
      <p>{comment.body}</p>
      {!replies && comment.replyCount
        ? <button onClick={() => fetchData(`http://localhost:3000/comments?parentId=${comment.id}`, setReplies)}>
            Replies {comment.replyCount}
          </button>
        : null}
      <div>
        {replies ? replies.map((reply) => (
          <Comment key={reply.id} comment={reply} />
        )) : null}
        {user && token
          ? isReplying
            ? <div>
                <input
                  type="text"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleReply();
                  }}
                />
                <button
                  onClick={handleReply}>
                  Submit
                </button>
              </div>
            : <button onClick={() => setIsReplying(true)}>Reply</button>
          : null}
      </div>
    </div>
  )
}

export default Comment;