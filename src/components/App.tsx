import { Outlet } from "react-router";
import Header from "./Header";
import { useEffect, useState } from "react";
import { fetchData, getUser } from "../utils/fetchFunctions";
import Cookies from "js-cookie";
import { User } from "../types/AuthContext";
import { AuthContext } from "../contexts";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>(Cookies.get("token") || "");

  useEffect(() => {
    if (token) getUser(token, setUser);
    fetchData("http://localhost:3000/categories", setCategories);
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      <Header />
      <main>
        <Outlet context={{categories}} />
      </main>
    </AuthContext.Provider>
  )
}

export default App;