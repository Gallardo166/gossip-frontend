import { useState } from "react"
import handleSubmit from "../../utils/handleSubmit";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form onSubmit={() => {
      handleSubmit("http://localhost:3000/user", username, password);
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
      <button type="submit">Register</button>
    </form>
  )
}

export default SignupPage;