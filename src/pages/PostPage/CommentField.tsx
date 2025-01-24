import { Button, IconButton, TextField } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

type CommentFieldProps = {
  placeholder: string,
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  handleClear: () => void,
  handleSubmit: () => Promise<void>,
}

const CommentField = ({placeholder, value, setValue, handleClear, handleSubmit }: CommentFieldProps) => {
  return (
    <div className="commentFieldContainer">
      <div className="commentField">
        {value
          ? <TextField multiline 
              variant="standard"
              className="replyInput"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />
          : <TextField multiline 
              variant="standard"
              className="replyInput"
              placeholder={placeholder}
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />}
        <IconButton className="clearButton" onClick={handleClear}>
          <ClearIcon sx={{color: value ? "#9c48ab": "#82558a"}} />
        </IconButton>
      </div>
      <Button disabled={!value} onClick={handleSubmit}>Submit</Button>
    </div>
  )
}

export default CommentField;