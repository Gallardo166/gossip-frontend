import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchData } from "../../utils/fetchFunctions";
import { PostType } from "../../types/Post";
import parseComments from "../../utils/parseComments";
import CommentSection from "./CommentSection";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<PostType>({} as PostType);

  useEffect(() => {
    fetchData(`http://localhost:3000/post/${id}`, setPost, parseComments);
  }, [id]);
  
  return (
    <div>
      <h1>{post.title}</h1>
      <p className="newLine">{post.body}</p>
      {post.imageUrl ? <img src={post.imageUrl} /> : null}
      <CommentSection commentCount={post.commentCount} comments={post.comments} />
    </div>

  )
}

export default PostPage;