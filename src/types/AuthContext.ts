export type User = {
  username: string;
  password: string;
}

export type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>> | null;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>> | null;
}