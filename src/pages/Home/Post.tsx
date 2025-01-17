import { useNavigate } from "react-router"
import type { PostPreviewType } from "../../types/PostPreview"

type PostProps = {
  post: PostPreviewType
}

const Post = ({ post } : PostProps) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/post/${post.id}`)}>
      <div>
        <div>
          <p>{post.username}</p>
          <p>{post.date}</p>
        </div>
        <h1>{post.title}</h1>
        <h2>{post.category}</h2>
        <p>{post.body}</p>
        <div>
          <p>{post.likeCount}</p>
          <p>{post.commentCount}</p>
        </div>
      </div>
      <div>
      </div>
    </div>
  )
}

export default Post