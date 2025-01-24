import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { fetchData } from "../../utils/fetchFunctions";
import { PostType } from "../../types/Post";
import parseComments from "../../utils/parseComments";
import CommentSection from "./CommentSection";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Fab } from "@mui/material";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<PostType>({} as PostType);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(`http://localhost:3000/post/${id}`, setPost, parseComments);
    window.scrollTo(0, 0);
  }, [id]);
  
  return (
    <>
      <Fab className="backButton">
        <ArrowBackIosNewIcon onClick={() => navigate(-1)} />
      </Fab>
      <div>
        <h1>{post.title}</h1>
        <p className="newLine">{post.body}</p>
        {post.imageUrl ? <img src={post.imageUrl} /> : null}
        <CommentSection commentCount={post.commentCount} comments={post.comments} />
      </div>
    </>
  )
}

export default PostPage;