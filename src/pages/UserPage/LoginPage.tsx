import { useContext, useState } from "react"
import { handleLogin } from "../../utils/fetchFunctions";
import { useNavigate } from "react-router";
import { AuthContext } from "../../contexts";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      if (setUser && setToken) handleLogin({username, password}, setUser, setToken);
    }}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          required
          id="username"
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          required
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" onClick={() => navigate("/")}>Log In</button>
    </form>
  )
}

export default LoginPage;