import { useContext } from "react"
import { AuthContext } from "../../contexts"
import { Link, Outlet, useOutletContext } from "react-router-dom";
import { Category } from "../../types/Category";
import { Typography } from "@mui/material";
import "../../styles/UserPage/UserPage.css"

const UserPage = () => {
  const { user, token } = useContext(AuthContext);
  const {categories} = useOutletContext<{ categories: Category[] }>();

  return (
    <div>
      {user && token
        ? <Outlet context={{ categories }} />
        : <div className="loginPrompt">
            <Typography>Please <Link className="loginLink" to="/login">Log in</Link></Typography>
          </div>}
    </div>
  )
}

export default UserPage;