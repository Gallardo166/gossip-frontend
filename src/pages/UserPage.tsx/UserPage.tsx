import { useContext } from "react"
import { AuthContext } from "../../contexts"
import { Link, Outlet, useOutletContext } from "react-router-dom";
import { Category } from "../../types/Category";

const UserPage = () => {
  const { user } = useContext(AuthContext);
  const {categories} = useOutletContext<{ categories: Category[] }>();

  return (
    <div>
      {user
        ? <Outlet context={{categories}} />
        : <p>Please <Link to="/login">Log in</Link></p>}
    </div>
  )
}

export default UserPage;