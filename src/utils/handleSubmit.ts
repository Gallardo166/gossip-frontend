import Cookies from "js-cookie";
import { User } from "../types/AuthContext";

export async function handleSignup(formData: object) {
  try {
    const response = await fetch(
      "http://localhost:3000/user", 
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      }
    );
    if (response.status === 400) {
      throw new Error(await response.text());
    }
  } catch (err) {
    console.log(err);
  }
}

export async function handleLogin(
  formData: object, 
  setUser: React.Dispatch<React.SetStateAction<User | null>>, 
  setToken: React.Dispatch<React.SetStateAction<string | null>>) {
    try {
      const response = await fetch(
        "http://localhost:3000/login",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData)
        }
      );
      console.log(response.body);
      if (response.status === 400) {
        throw new Error(await response.text());
      }
      const resJson = await response.json();
      console.log(resJson);
      Cookies.set("token", resJson.tokenString, { expires: 7 })
      setToken(resJson.tokenString);
      setUser({ username: resJson.username, password: resJson.password })
    } catch (err) {
      console.log(err);
    }
}