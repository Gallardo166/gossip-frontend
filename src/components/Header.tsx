import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <nav>
      <Link to="/"><h1>Gossip</h1></Link>
      <SearchBar />
      <Link to="/register">Sign up</Link>
    </nav>
  )
}

export default Header;