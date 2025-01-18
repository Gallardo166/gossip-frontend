import { useState } from "react";
import { CommentType } from "../../types/Comment";
import { fetchData } from "../../utils/fetchData";

type CommentProps = {
  comment: CommentType
}

const Comment = ({ comment }: CommentProps) => {
  const [replies, setReplies] = useState<CommentType[] | null>(null);
  return (
    <div>
      <p>{comment.username}</p>
      <p>{comment.body}</p>
      {!replies && comment.replyCount
        ? <button
            onClick={() => fetchData(`http://localhost:3000/comments?parentId=${comment.id}`,
                                     setReplies)}
          >
            Replies {comment.replyCount}
          </button>
        : null}
      <div>
        {replies ? replies.map((reply) => (
          <Comment key={reply.id} comment={reply} />
        )) : null}
      </div>
    </div>
  )
}

export default Comment;