import { Outlet } from "react-router";
import Header from "./Header";
import { useEffect, useState } from "react";
import fetchData from "../utils/fetchData";

const App = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData("http://localhost:3000/categories", setCategories);
  }, []);

  return (
    <>
      <Header />
      <main>
        <Outlet context={{categories}} />
      </main>
    </>
  )
}

export default App;