import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useContext } from "react";
import { AuthContext } from "../contexts";
import Cookies from "js-cookie";
import "../styles/Header.css"
import { Button } from "@mui/material";

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="header">
      <Link to="/" className="titleLink" onClick={() => window.scrollTo(0, 0)}><h1 className="title">Gossip</h1></Link>
      <SearchBar />
      {user
        ? <Button 
            className="logoutButton"
            variant="outlined" 
            color="secondary" 
            onClick={() => {
              Cookies.remove("token");
              location.reload();
          }}>
            Log out
          </Button>
        : <div className="loginButtons">
            <Button variant="outlined">
              <Link to="/register">Sign up</Link>
            </Button>
            <Button variant="contained" color="primary">
              <Link to="/login">Log In</Link>
            </Button>
          </div>}
    </nav>
  )
}

export default Header;