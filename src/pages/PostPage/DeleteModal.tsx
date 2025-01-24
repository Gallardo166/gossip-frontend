import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material"
import { useState } from "react"
import { deleteProtected } from "../../utils/fetchFunctions";
import DeleteIcon from '@mui/icons-material/Delete';
import { CommentType } from "../../types/Comment";

type DeleteModalProps = {
  token: string,
  comment: CommentType,
}
const DeleteModal = ({token, comment}: DeleteModalProps) => {
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
    await deleteProtected("http://localhost:3000/comment", token, { id: comment.id });
    location.reload();
  }

  return (
    <>
      <IconButton onClick={handleOpen} className="deleteCommentButton">
        <DeleteIcon sx={{color:"white"}} />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Comment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are about to delete this comment. Are you sure?
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