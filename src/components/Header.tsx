import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useContext } from "react";
import { AuthContext } from "../contexts";
import Cookies from "js-cookie";
import "../styles/Header.css";
import { Button } from "@mui/material";

const Header = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

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
              navigate("/");
              location.reload();
          }}>
            Log out
          </Button>
        : <div className="loginButtons">
            <Link to="/register">
              <Button variant="outlined">Sign up</Button>
            </Link>
            <Link to="/login">
              <Button variant="contained" color="primary">Log In</Button>
            </Link>
          </div>}
    </nav>
  )
}

export default Header;