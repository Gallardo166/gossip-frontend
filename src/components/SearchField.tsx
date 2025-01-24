import { Button, TextField } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

type SearchFieldProps = {
  titleQuery: string,
  setTitleQuery: React.Dispatch<React.SetStateAction<string>>,
  handleSearch: (titleQuery: string) => void;
}

const SearchField = ({ titleQuery, setTitleQuery, handleSearch }: SearchFieldProps) => {

  return (
    <div className="searchField">
      <TextField className="searchInput"
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
              borderRadius: "24px",
            },
            "&:hover:not(.Mui-focused)": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
            },
            "& .MuiInputLabel-outlined": {
              color: "#d4d0d9",
            },
            input: {
              color: "white"
            }
          }}
          label="Search..."
          type="text"
          name="titleQuery"
          id="title_query"
          value={titleQuery}
          onChange={(e) => setTitleQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(titleQuery);
            }
          }} />
          {titleQuery 
            ? <Button className="clearButton" onClick={() => {
                setTitleQuery("");
                handleSearch("");
              }}>
                <ClearIcon />
              </Button>
            : null}
    </div>
  )
}

export default SearchField;