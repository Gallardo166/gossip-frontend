import { useNavigate } from "react-router";
import type { PostPreviewType } from "../../types/PostPreview";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts";
import { Link } from "react-router-dom";
import { deleteProtected,fetchDataProtected, postProtected } from "../../utils/fetchFunctions";
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Chip, IconButton, Typography } from "@mui/material";
import "../../styles/Home/Post.css";
import { formatDate } from "../../utils/formatDate";
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EditIcon from '@mui/icons-material/Edit';
import DeleteModal from "./DeleteModal";

type PostProps = {
  post: PostPreviewType;
}

const Post = ({ post } : PostProps) => {
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  
  useEffect(() => {
    if (token) fetchDataProtected(`${import.meta.env.VITE_URL}/like?postId=${post.id}`, token, setIsLiked, (data: {isLiked: boolean}) => data.isLiked);
  }, [token, post.id]);

  async function handleLike() {
    postProtected(`${import.meta.env.VITE_URL}/like?postId=${post.id}`, token, {});
    setLikeCount(likeCount + 1);
    setIsLiked(true);
  }

  async function handleUnlike() {
    deleteProtected(`${import.meta.env.VITE_URL}/like?postId=${post.id}`, token, {});
    setLikeCount(likeCount - 1);
    setIsLiked(false);
  }

  return (
    <Card>
      <CardActionArea onClick={() => navigate(`/post/${post.id}`)}>
        <CardContent className="content">
          <Typography gutterBottom variant="body1" sx={{color:"white"}}>
            {post.username} &middot; {formatDate(post.date)}
          </Typography>
          <Typography gutterBottom variant="h5" sx={{color:"white"}}>
            {post.title}
          </Typography>
          <Chip color="primary" label={post.category} sx={{fontSize: "14px"}} />
          <Typography className="postBodyPreview" sx={{color:"#d4d0d9"}}>
            {post.body}
          </Typography>
        </CardContent>
        {post.imageUrl ? <CardMedia component="img" src={post.imageUrl} /> : null}
      </CardActionArea>
      <CardActions className="cardActions" onClick={() => navigate(`/post/${post.id}`)}>
          <div className="cardActionsLeft">
            <div className="likes">
              <IconButton
                className="likeButton"
                aria-label="like"
                onClick={(e) => {
                  e.stopPropagation();
                  if (user) {
                    if (isLiked) {
                      handleUnlike();
                    } else {
                      handleLike();
                    }
                  } else {
                    navigate("/login");
                  }
              }}>
                {isLiked
                  ? <FavoriteIcon className="heartIcon" sx={{color: "red"}} />
                  : <FavoriteBorderIcon className="heartIcon" sx={{color: "white"}} />}
              </IconButton>
              <Typography sx={{color: "#d4d0d9"}}>
                {likeCount}
              </Typography>
            </div>
            <div className="commentsAction">
              <IconButton 
                className="commentButton"
                aria-label="comment"
                sx={{color: "white"}}
                onClick={() => {
                  if (user) {
                    navigate(`/post/${post.id}`);
                  } else {
                    navigate("/login");
              }}}>
                <CommentIcon />
              </IconButton>
              <Typography sx={{color: "#d4d0d9"}}>
                {post.commentCount}
              </Typography>
            </div>
          </div>
          {post.username === user?.username
            ? <div className="cardActionsRight">
                <Link onClick={(e) => e.stopPropagation()} to="/user/edit" state={{post}} className="editPostButton"><EditIcon /></Link>
                <DeleteModal token={token} post={post} />
              </div>
            : null}
        </CardActions>
    </Card>
  )
}

export default Post