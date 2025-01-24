import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useState } from "react"
import { deleteProtected } from "../../utils/fetchFunctions";
import DeleteIcon from '@mui/icons-material/Delete';
import { PostPreviewType } from "../../types/PostPreview";

type DeleteModalType = {
  token: string,
  post: PostPreviewType,
}
const DeleteModal = ({token, post}: DeleteModalType) => {
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
    await deleteProtected("http://localhost:3000/post", token, { id: post.id.toString() });
    location.reload();
  }

  return (
    <>
      <button onClick={handleOpen} className="deleteButton"><DeleteIcon /></button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are about to delete this post. Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No, keep it</Button>
          <Button onClick={(e) => {
            handleClose(e);
            handleDelete();
          }}>Yes, delete</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteModal;