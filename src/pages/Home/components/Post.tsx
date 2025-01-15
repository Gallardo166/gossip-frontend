import type { PostType } from "../types/PostPreview"

type PostProps = {
  post: PostType
}

const Post = ({ post } : PostProps) => {
  return (
    <div>
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