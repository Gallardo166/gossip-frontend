import { createContext } from "react";
import { AuthContextType } from "./types/AuthContext";


export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: null,
  token: null,
  setToken: null,
});