import { useContext, useEffect, useState } from "react"
import { handleLogin } from "../../utils/fetchFunctions";
import { useNavigate } from "react-router";
import { AuthContext } from "../../contexts";
import { Button, TextField, Typography } from "@mui/material";
import "../../styles/Auth/LoginPage.css"

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{message: string} | null>(null);
  const { setUser, setToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <form className="loginForm" onSubmit={async (e) => {
      e.preventDefault();
      setLoading(true);
      if (setUser && setToken) {
        const success = await handleLogin({username, password}, setUser, setToken, setError);
        setLoading(false);
        if (success) navigate("/");
      }
    }}>
      <TextField
        id="username"
        name="username"
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        slotProps={{ htmlInput: { minLength: 5, maxLength: 100 }}}
        required
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#757375",
          },
          "& .MuiInputLabel-outlined": {
            color: "#d4d0d9",
          },
          input: {
            color: "white"
          }
        }}
      />
      <TextField
        id="password"
        name="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        slotProps={{ htmlInput: { minLength: 8, maxLength: 100 }}}
        required
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#757375",
          },
          "& .MuiInputLabel-outlined": {
            color: "#d4d0d9",
          },
          input: {
            color: "white"
          }
        }}
      />
      {error
          ? <Typography sx={{color: "red"}}>
              {error.message}
            </Typography>
          : null}
      <Button className="loginButton" loading={loading} type="submit" variant="contained">Log In</Button>
    </form>
  )
}

export default LoginPage;