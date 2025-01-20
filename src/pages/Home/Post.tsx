import { useNavigate } from "react-router"
import type { PostPreviewType } from "../../types/PostPreview"
import { useContext } from "react"
import { AuthContext } from "../../contexts"
import { Link } from "react-router-dom"
import { deleteProtected } from "../../utils/fetchFunctions"

type PostProps = {
  post: PostPreviewType
}

const Post = ({ post } : PostProps) => {
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);

  async function handleDelete() {
    await deleteProtected("http://localhost:3000/post", token, { id: post.id.toString() });
    location.reload();
  }

  return (
    <div>
      <div onClick={() => navigate(`/post/${post.id}`)}>
        <div>
          <p>{post.username}</p>
          <p>{post.date}</p>
        </div>
        <h1>{post.title}</h1>
        <h2>{post.category}</h2>
        <p className="newLine">{post.body}</p>
        <div>
          <p>{post.likeCount}</p>
          <p>{post.commentCount}</p>
        </div>
      </div>
      <div>
        {post.imageUrl ? <img src={post.imageUrl} /> : null}
        {post.username === user?.username
          ? <div>
              <Link to="/user/edit" state={{post}}>Edit post</Link>
              <button onClick={handleDelete}>Delete</button>
            </div>
          : null}
      </div>
    </div>
  )
}

export default Post