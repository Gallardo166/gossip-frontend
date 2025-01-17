import { useEffect, useState } from "react";
import { useParams } from "react-router";
import fetchData from "../../utils/fetchData";
import { PostType } from "../../types/Post";
import parseComments from "../../utils/parseComments";
import CommentSection from "./CommentSection";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<PostType>({} as PostType);

  useEffect(() => {
    fetchData(`http://localhost:3000/post/${id}`, setPost, parseComments);
  }, [id]);
  if (post) console.log(post);
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <CommentSection comments={post.comments} />
    </div>

  )
}

export default PostPage;