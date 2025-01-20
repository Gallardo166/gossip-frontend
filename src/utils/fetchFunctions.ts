import Cookies from "js-cookie";
import { User } from "../types/AuthContext";

//GET without authorization
export async function fetchData<T, data>(
  url: string,
  setFn: React.Dispatch<React.SetStateAction<T>>,
  manipulateFn?: (data: data) => T) {
    console.log(url);
    try {
      const response = await fetch(
        url,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      let resJson = await response.json();
      if (manipulateFn) {resJson = manipulateFn(resJson)}
      setFn(resJson);
    } catch (err) {
      console.log(err);
    }
}

//POST with multiform/form-data and authorization
export async function postFormProtected(url: string, token: string, formData: FormData) {
    console.log(url);
    try {
      await fetch(
        url,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Authorization": token,
          },
          body: formData,
        }
      );
    } catch (err) {
      console.log(err);
    }
}

//POST with application/json and authorization
export async function postProtected(url: string, token: string, data: object) {
  console.log(url);
  try {
    await fetch(
      url,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
        body: JSON.stringify(data),
      }
    );
  } catch (err) {
    console.log(err);
  }
}

//authorization functions

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
  setToken: React.Dispatch<React.SetStateAction<string>>) {
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

export async function getUser<T>(token: string, setFn: React.Dispatch<React.SetStateAction<T>>) {
  try {
    const response = await fetch(
      "http://localhost:3000/user",
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
      }
    );
    const resJson = await response.json();
    if (setFn) setFn(resJson);
  } catch (err) {
    console.log(err);
  }
}