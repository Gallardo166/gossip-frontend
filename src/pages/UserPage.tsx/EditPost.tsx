import { useContext, useState } from "react"
import { useNavigate, useOutletContext } from "react-router";
import { Category } from "../../types/Category";
import { putFormProtected } from "../../utils/fetchFunctions";
import { AuthContext } from "../../contexts";
import { getDate } from "../../utils/formatDate";
import { useLocation } from "react-router";

const EditPost = () => {
  const { state } = useLocation();
  const post = state.post;
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const { categories } = useOutletContext<{ categories: Category[] }>();
  const [category, setCategory] = useState(categories[0].id);
  const [file, setFile] = useState<File | null>(null)
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <form onSubmit={async (e) => {
      e.preventDefault();
      const data = new FormData();
      data.append("id", post.id)
      data.append("title", title);
      data.append("body", body);
      if (file) data.append("file", file);
      data.append("category", category.toString());
      data.append("date", getDate());
      await putFormProtected("http://localhost:3000/post", token, data);
      navigate("/");
    }}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="body">Body</label>
      <textarea
        name="body"
        id="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <select
        value={category}
        onChange={(e) => setCategory(Number(e.target.value))}
      >
        {categories.map((category, index) => (
          <option 
            value={category.id}
            key={index}>
            {category.name}
          </option>
        ))}
      </select>
      <input
        type="file"
        name="imageUrl"
        id="imageUrl"
        onChange={(e) => {
          if (e.target.files) setFile(e.target.files[0])
        }}
      />
      <button type="submit">Make changes</button>
    </form>
  )
}

export default EditPost;