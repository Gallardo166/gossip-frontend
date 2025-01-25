import { useContext, useEffect, useState } from "react"
import { handleLogin, handleSignup } from "../../utils/fetchFunctions";
import { Button, TextField, Typography } from "@mui/material";
import "../../styles/Auth/SignupPage.css"
import { AuthContext } from "../../contexts";
import { useNavigate } from "react-router";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [error, setError] = useState<{message: string} | null>(null);
  const { setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function checkPasswordMatch(password: string, confirmPassword: string) {
    if (confirmPassword === password && password != "") {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  }

  return (
    <form className="signupForm" onSubmit={async (e) => {
      e.preventDefault();
      setLoading(true);
      const success = await handleSignup({username, password, confirmPassword}, setError);
      setLoading(false);
      if (success) {
        if (setUser && setToken) await handleLogin({username, password}, setUser, setToken, setError)
        navigate("/");
      }
    }}>
      <div className="usernameField">
        <TextField
          name="username"
          id="username"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          slotProps={{ htmlInput: { minLength: 5, maxLength: 100 }}}
          required
          error={username.length < 5 || username.length > 100}
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
        <Typography sx={{color: username.length >= 5 && username.length <= 100 ? "green" : "red"}}>
          Between 5 and 100 characters
        </Typography>
        {error
          ? <Typography sx={{color: "red"}}>
              {error.message}
            </Typography>
          : null}
      </div>
      <div className="passwordField">
        <TextField
          name="password"
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value.replace(/\s/g, ''));
            checkPasswordMatch(e.target.value.replace(/\s/g, ''), confirmPassword);
          }}
          slotProps={{ htmlInput: { minLength: 8, maxLength: 100 }}}
          required
          error={password.length < 8 || password.length > 100 || !passwordMatch}
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
        <Typography sx={{color: password.length >= 8 && password.length <= 100 ? "green" : "red"}}>
          Between 8 and 100 characters
        </Typography>
      </div>
      <div className="confirmPasswordField">
        <TextField
          name="confirmPassword"
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value.replace(/\s/g, ''));
            checkPasswordMatch(password, e.target.value.replace(/\s/g, ''));
          }}
          required
          slotProps={{ htmlInput: { minLength: 8, maxLength: 100 }}}
          error={confirmPassword.length < 8 || confirmPassword.length > 100 || !passwordMatch}
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
        <Typography sx={{color: confirmPassword.length >= 8 && confirmPassword.length <= 100 ? "green" : "red"}}>
          Between 8 and 100 characters
        </Typography>
        <Typography sx={{color: passwordMatch ? "green" : "red"}}>
          Passwords match
        </Typography>
      </div>
      <Button className="signupButton" variant="contained" loading={loading} disabled={!passwordMatch} type="submit">Register</Button>
    </form>
  )
}

export default SignupPage;