import { Outlet } from "react-router";
import Header from "./Header";
import { useEffect, useState } from "react";
import { fetchData, getUser } from "../utils/fetchFunctions";
import Cookies from "js-cookie";
import { User } from "../types/AuthContext";
import { AuthContext } from "../contexts";
import { createTheme, ThemeProvider } from "@mui/material";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>(Cookies.get("token") || "");
  const theme = createTheme({
    palette: {
      primary: {
        main: "#9436bf"
      },
      secondary: {
        main: "#af45c4"
      }
    }
  });
  
  useEffect(() => {
    if (token) getUser(token, setUser);
    fetchData(import.meta.env.VITE_URL + "/categories", setCategories);
  }, [token]);

  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider value={{ user, setUser, token, setToken }}>
        <Header />
        <main>
          <Outlet context={{categories}} />
        </main>
      </AuthContext.Provider>
    </ThemeProvider>
  )
}

export default App;