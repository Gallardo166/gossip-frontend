import { useContext, useState } from "react";
import { CommentType } from "../../types/Comment";
import Comment from "./Comment";
import { AuthContext } from "../../contexts";
import { postProtected } from "../../utils/fetchFunctions";
import { getDate } from "../../utils/formatDate";
import { useParams } from "react-router";
import "../../styles/PostPage/CommentSection.css";
import { Button, Divider, Typography } from "@mui/material";
import CommentField from "./CommentField";

type CommentSectionProps = {
  commentCount: number;
  comments: CommentType[] | null;
}

const CommentSection = ({commentCount, comments}: CommentSectionProps) => {
  const [isCommenting, setIsCommenting] = useState(false);
  const [comment, setComment] = useState("");
  const { user, token } = useContext(AuthContext);
  const { id } = useParams();

  async function handleComment() {
    const data = {
      body: comment,
      postId: Number(id),
      date: getDate(),
    };
    await postProtected(import.meta.env.VITE_URL + "/comment", token, data);
    location.reload();
  }

  return (
    <div>
      <div className="commentSectionHeader">
        <Typography variant="h6">
          Comments {commentCount}
        </Typography>
        {user
          ? <Button className="commentButton" onClick={() => setIsCommenting(true)}>
              Comment
            </Button>
          : null}
      </div>
      {user && isCommenting
          ? <div className="addCommentField">
              <CommentField
                  placeholder="Add a comment..."
                  value={comment}
                  setValue={setComment}
                  handleClear={() => {
                    setComment("");
                    setIsCommenting(false);
                  }}
                  handleSubmit={handleComment}
                />
            </div>
          : null}
      <div className="comments">
        {comments?.map((comment) => (
          <div key={comment.id}>
            <Divider sx={{bgcolor:"#757375"}} />
            <Comment padding="0" comment={comment} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentSection;