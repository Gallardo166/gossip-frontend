import { CommentType } from "../../types/Comment";
import Comment from "./Comment";

type CommentSectionProps = {
  commentCount: number,
  comments: CommentType[] | null
}

const CommentSection = ({commentCount, comments}: CommentSectionProps) => {
  return (
    <div>
      <p>Comments {commentCount}</p>
      {comments?.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  )
}

export default CommentSection;