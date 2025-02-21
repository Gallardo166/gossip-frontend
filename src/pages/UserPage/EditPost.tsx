import { useContext, useEffect, useState } from "react"
import { useNavigate, useOutletContext } from "react-router";
import { Category } from "../../types/Category";
import { putFormProtected } from "../../utils/fetchFunctions";
import { AuthContext } from "../../contexts";
import { getDate } from "../../utils/formatDate";
import { useLocation } from "react-router";
import { Button, IconButton, MenuItem, Select, TextField, Typography } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import ClearIcon from '@mui/icons-material/Clear';

const EditPost = () => {
  const { state } = useLocation();
  const post = state.post;
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const { categories } = useOutletContext<{ categories: Category[] }>();
  const [categoryName, setCategoryName] = useState(post.category);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <form className="postForm" onSubmit={async (e) => {
      e.preventDefault();
      const data = new FormData();
      data.append("id", post.id)
      data.append("title", title);
      data.append("body", body);
      if (file) data.append("file", file);
      data.append("category", categories.filter(category => category.name === categoryName)[0].id.toString());
      data.append("date", getDate());
      setLoading(true);
      await putFormProtected(import.meta.env.VITE_URL + "/post", token, data);
      setLoading(false);
      navigate(`/post/${post.id}`);
    }}>
      <div className="titleField">
          <TextField
            name="title"
            id="title"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            slotProps={{ htmlInput: {maxLength: 200 }}}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#757375",
              },
              "& .MuiInputLabel-outlined": {
                color: "#d4d0d9",
              },
              input: {
                color: "white"
              }
            }}
          />
          <Typography sx={{color: "#d4d0d9"}} className="titleLength">{title.length}/200</Typography>
        </div>
        <div className="detailFields">
          <Typography>Category *</Typography>
          <Select
            required
            className="categorySelect"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#757375",
              },
              "& .MuiInputLabel-outlined": {
                color: "#d4d0d9",
              },
              div: {
                color: "white"
              }
            }}
          >
            {categories.map((category, index) => (
              <MenuItem
                value={category.name}
                key={index}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
          <div className="imageField">
            <Typography>Image</Typography>
            {file
              ? <IconButton onClick={() => setFile(null)}>
                  <ClearIcon sx={{color:"#9c48ab"}} />
                </IconButton>
              : null}
          </div>
          <Button
            variant="outlined"
            component="label"
            className="uploadButton"
          >
            {file 
              ? <><ImageIcon />  Uploaded</>
              : "Upload File"}
            <input
              type="file"
              name="imageUrl"
              id="imageUrl"
              onChange={(e) => {
                if (e.target.files) setFile(e.target.files[0])
              }}
              hidden
            />
          </Button>
        </div>
        <div className="bodyField">
          <TextField
            name="body"
            id="body"
            label="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            multiline
            slotProps={{ htmlInput: {maxLength: 3000 }}}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#757375",
              },
              "& .MuiInputLabel-outlined": {
                color: "#d4d0d9",
              },
              input: {
                color: "white"
              }
            }}
          />
          <Typography className="bodyLength">{body.length}/3000</Typography>
        </div>
        <Button loading={loading} className="submitFormButton" variant="contained" type="submit">Make changes</Button>
    </form>
  )
}

export default EditPost;