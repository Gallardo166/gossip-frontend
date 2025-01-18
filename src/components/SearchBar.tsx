import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router";
import createURL from "../utils/createURL";

const SearchBar = () => {
  const [titleQuery, setTitleQuery] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  return (
    <div>
      <input
        type="text"
        name="titleQuery"
        id="title_query"
        value={titleQuery}
        onChange={(e) => setTitleQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") navigate(createURL("query", titleQuery, searchParams));
        }} />
      <button onClick={() => navigate(createURL("query", titleQuery, searchParams))}>Search</button>
    </div>
  )
}

export default SearchBar