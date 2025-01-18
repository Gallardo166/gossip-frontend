import { useContext, useState } from "react"
import { useOutletContext } from "react-router";
import { Category } from "../../types/Category";
import { postProtected } from "../../utils/fetchData";
import { AuthContext } from "../../contexts";
import { getDate } from "../../utils/formatDate";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const {categories} = useOutletContext<{ categories: Category[] }>();
  const [category, setCategory] = useState(categories[0].id);
  const [file, setFile] = useState<File | null>(null)
  const { token } = useContext(AuthContext);

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const data = new FormData();
      data.append("title", title);
      data.append("body", body);
      if (file) data.append("file", file);
      data.append("category", category.toString());
      data.append("date", getDate())
      if (token) postProtected("http://localhost:3000/post", token, data)
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
      <button type="submit">Create</button>
    </form>
  )
}

export default CreatePost