import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { deleteProtected, fetchData, fetchDataProtected, postProtected } from "../../utils/fetchFunctions";
import { PostType } from "../../types/Post";
import parseComments from "../../utils/parseComments";
import CommentSection from "./CommentSection";
import { Chip, Divider, IconButton, Typography } from "@mui/material";
import "../../styles/PostPage/PostPage.css"
import { formatDate } from "../../utils/formatDate";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { AuthContext } from "../../contexts";
import LoadingPost from "./LoadingPost";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<PostType>(null as unknown as PostType);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(`http://localhost:3000/post/${id}`, setPost, parseComments);
    fetchDataProtected(`http://localhost:3000/like?postId=${id}`, token, setIsLiked, (data: {isLiked: boolean}) => data.isLiked);
    setLikeCount(post?.likeCount);
    window.scrollTo(0, 0);
  }, [id, post?.likeCount, token]);

  async function handleLike() {
    postProtected(`http://localhost:3000/like?postId=${id}`, token, {});
    setLikeCount(likeCount + 1);
    setIsLiked(true);
  }

  async function handleUnlike() {
    deleteProtected(`http://localhost:3000/like?postId=${id}`, token, {});
    setLikeCount(likeCount - 1);
    setIsLiked(false);
  }

  return (
    <>
      {post
        ? <div className="post">
            <Typography gutterBottom variant="body1" sx={{color:"white"}}>
              {post.username} &middot; {formatDate(post.date)}
            </Typography>
            <Typography gutterBottom variant="h4" sx={{color:"white"}}>
              {post.title}
            </Typography>
            <Chip color="primary" label={post.category} sx={{fontSize: "14px"}} />
            <Divider sx={{bgcolor:"#757375"}} />
            <div className="postContent">
              <div className="likeColumn">
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
                  <Typography className="likeCount" sx={{color: "#d4d0d9"}}>
                    {likeCount}
                  </Typography>
              </div>
              <div className="contentColumn">
                <Typography className="postBody" sx={{color:"#d4d0d9"}}>
                  {post.body}
                </Typography>
                {post.imageUrl ? <img className="postImage" src={post.imageUrl} /> : null}
              </div>
            </div>
            <CommentSection commentCount={post.commentCount} comments={post.comments} />
          </div>
        : <div className="post">
            <LoadingPost />
          </div>}
    </>
  )
}

export default PostPage;