import { useContext, useState } from "react";
import { CommentType } from "../../types/Comment";
import { fetchData, postProtected, putProtected } from "../../utils/fetchFunctions";
import { AuthContext } from "../../contexts";
import { useParams } from "react-router";
import { formatDate, getDate } from "../../utils/formatDate";
import { Button, IconButton, Typography } from "@mui/material";
import ReplyIcon from '@mui/icons-material/Reply';
import "../../styles/PostPage/Comment.css";
import CommentField from "./CommentField";
import EditIcon from '@mui/icons-material/Edit';
import DeleteCommentModal from "./DeleteCommentModal";

type CommentProps = {
  padding: string;
  comment: CommentType;
}

const Comment = ({ padding, comment }: CommentProps) => {
  const [body, setBody] = useState(comment.body);
  const [replies, setReplies] = useState<CommentType[] | null>(null);
  const [repliesOpen, setRepliesOpen] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [reply, setReply] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [edit, setEdit] = useState(comment.body);
  const { user, token } = useContext(AuthContext);
  const { id } = useParams();

  async function handleReply() {
    const data = {
      body: reply,
      parentId: comment.id,
      postId: Number(id),
      date: getDate(),
    };
    await postProtected(`${import.meta.env.VITE_URL}/comment?parentId=${comment.id}`, token, data);
    location.reload();
  }

  async function handleEdit() {
    const data = {
      id: comment.id,
      body: edit,
      date: getDate(),
    };
    await putProtected(import.meta.env.VITE_URL + "/comment", token, data);
    setBody(edit);
    setIsEditing(false);
  }

  return (
    <>
      <div className="commentContainer" style={{paddingLeft: padding}}>
        <Typography sx={{color:"white"}}>
          {comment.username} &middot; {formatDate(comment.date)}
        </Typography>
        <div className="commentBody">
          {isEditing
            ? <CommentField
                placeholder="Edit your comment..."
                value={edit}
                setValue={setEdit}
                handleClear={() => {
                  setEdit(comment.body);
                  setIsEditing(false);
                }}
                handleSubmit={handleEdit} />
            : <Typography className="commentText" sx={{color:"#d4d0d9"}}>
                {body}
              </Typography>}
          {user
            ? <div className="commentActions">
                <IconButton className="replyButton" onClick={() => {
                  setIsReplying(true);
                  setIsEditing(false);
                }}>
                  <ReplyIcon sx={{color:"white"}} />
                </IconButton>
                {user.username === comment.username
                  ? <>
                      <IconButton className="editCommentButton" onClick={() => {
                        setIsEditing(true);
                        setIsReplying(false);
                        setReply("");
                      }}>
                        <EditIcon sx={{color:"white"}} />
                      </IconButton>
                      <DeleteCommentModal token={token} comment={comment} />
                    </>
                : null}
            </div>
            : null}
        </div>
        {isReplying
          ? <CommentField
              placeholder="Write a reply..."
              value={reply}
              setValue={setReply}
              handleClear={() => {
                setReply("");
                setIsReplying(false);
              }}
              handleSubmit={handleReply} />
          : null}
        {comment.replyCount
          ? !repliesOpen
            ? <Button className="repliesButton" onClick={() => {
                if (!replies) fetchData(`${import.meta.env.VITE_URL}/comments?parentId=${comment.id}`, setReplies);
                setRepliesOpen(true);
              }}>
                Show {comment.replyCount} {comment.replyCount > 1 ? "Replies" : "Reply"}
              </Button>
            : <Button className="repliesButton" onClick={() => setRepliesOpen(false)}>
                Hide {comment.replyCount} {comment.replyCount > 1 ? "Replies" : "Reply"}
              </Button>
          : null}
        <div className="replies">
          {repliesOpen && replies
            ? replies.map((reply, index) => (
                <Comment padding="20px" key={index} comment={reply} />
              ))
            : null}
        </div>
      </div>
    </>
  )
}

export default Comment;