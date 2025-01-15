import { useState } from "react"
import { Link } from "react-router";

const SearchBar = () => {
  const [titleQuery, setTitleQuery] = useState("");

  return (
    <div>
      <input
        type="text"
        name="titleQuery"
        id="title_query"
        value={titleQuery}
        onChange={(e) => setTitleQuery(e.target.value)} />
      <Link to={titleQuery ? `/query?title=${titleQuery}` : "/"}>Search</Link>
    </div>
  )
}

export default SearchBar