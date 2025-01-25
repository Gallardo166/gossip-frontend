import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material"
import { useState } from "react"
import { deleteProtected } from "../../utils/fetchFunctions";
import DeleteIcon from '@mui/icons-material/Delete';
import { PostPreviewType } from "../../types/PostPreview";

type DeleteModalProps = {
  token: string,
  post: PostPreviewType,
}
const DeleteModal = ({token, post}: DeleteModalProps) => {
  const [open, setOpen] = useState(false);

  function handleOpen(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    setOpen(true);
  }

  function handleClose(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    setOpen(false);
  }

  async function handleDelete() {
    await deleteProtected(import.meta.env.VITE_URL + "/post", token, { id: post.id.toString() });
    location.reload();
  }

  return (
    <>
      <IconButton onClick={handleOpen} className="deletePostButton">
        <DeleteIcon sx={{color:"white"}} />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are about to delete this post. Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No, keep it</Button>
          <Button variant="contained" onClick={(e) => {
            handleClose(e);
            handleDelete();
          }}>Yes, delete</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteModal;