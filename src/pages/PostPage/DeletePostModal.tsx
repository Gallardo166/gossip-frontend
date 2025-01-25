import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material"
import { useState } from "react"
import { deleteProtected } from "../../utils/fetchFunctions";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router";

type DeleteModalProps = {
  token: string;
  id: number;
}

const DeletePostModal = ({token, id}: DeleteModalProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function handleOpen(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    setOpen(true);
  }

  function handleClose(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    setOpen(false);
  }

  async function handleDelete() {
    await deleteProtected(import.meta.env.VITE_URL + "/post", token, { id });
    navigate("/");
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

export default DeletePostModal;