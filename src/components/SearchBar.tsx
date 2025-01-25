import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router";
import createURL from "../utils/createURL";
import { IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import "../styles/SearchBar.css"
import SearchField from "./SearchField";

const SearchBar = () => {
  const [titleQuery, setTitleQuery] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  function handleSearch(titleQuery: string) {
    navigate(createURL("query", titleQuery, searchParams));
  }

  return (
    <div className="searchBar">
      <SearchField titleQuery={titleQuery} setTitleQuery={setTitleQuery} handleSearch={handleSearch} />
      <IconButton className="searchButton" onClick={() => handleSearch(titleQuery)}>
        <SearchIcon sx={{color:"#9436bf", fontSize:"1.6em"}} />
      </IconButton>
    </div>
  )
}

export default SearchBar