import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Header = () => {
  console.log("test");
  return (
    <nav>
      <Link to="/"><h1>Gossip</h1></Link>
      <SearchBar />
      <Link to="/register">Sign up</Link>
      <Link to="/login">Log In</Link>
    </nav>
  )
}

export default Header;