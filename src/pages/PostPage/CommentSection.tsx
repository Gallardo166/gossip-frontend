import { CommentType } from "../../types/Comment";
import Comment from "./Comment";

type CommentSectionProps = {
  comments: CommentType[] | null
}

const CommentSection = ({comments}: CommentSectionProps) => {
  return (
    <div>
      <p>Comments {comments ? comments.length : 0}</p>
      {comments?.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  )
}

export default CommentSection;