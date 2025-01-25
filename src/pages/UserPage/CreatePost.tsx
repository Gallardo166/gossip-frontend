import { useContext, useEffect, useState } from "react"
import { useNavigate, useOutletContext } from "react-router";
import { Category } from "../../types/Category";
import { postFormProtected } from "../../utils/fetchFunctions";
import { AuthContext } from "../../contexts";
import { getDate } from "../../utils/formatDate";
import { Button, IconButton, MenuItem, Select, TextField, Typography } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import ClearIcon from '@mui/icons-material/Clear';
import "../../styles/UserPage/CreatePost.css"

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const {categories} = useOutletContext<{ categories: Category[] }>();
  const [category, setCategory] = useState(categories[0].id);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  return (
      <form className="postForm" onSubmit={async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("title", title);
        data.append("body", body);
        if (file) data.append("file", file);
        data.append("category", category.toString());
        data.append("date", getDate());
        setLoading(true);
        await postFormProtected(import.meta.env.VITE_URL + "/post", token, data);
        setLoading(false);
        navigate("/");
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
            value={category}
            onChange={(e) => setCategory(Number(e.target.value))}
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
                value={category.id}
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
        <Button loading={loading} className="submitFormButton" variant="contained" type="submit">Create</Button>
      </form>
  )
}

export default CreatePost;