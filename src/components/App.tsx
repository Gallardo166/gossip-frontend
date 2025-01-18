import { Outlet } from "react-router";
import Header from "./Header";
import { useEffect, useState } from "react";
import { fetchData, fetchProtectedData } from "../utils/fetchData";
import Cookies from "js-cookie";
import { User } from "../types/AuthContext";
import { AuthContext } from "../contexts";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(Cookies.get("token") || null);

  useEffect(() => {
    console.log(token);
    if (token) fetchProtectedData("http://localhost:3000/user", setUser, token);
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