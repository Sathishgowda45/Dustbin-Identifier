import { useState } from "react";
import { loginUser } from "../services/api";

function Login({ setUser, setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = await loginUser({
      email,
      password
    });

    if (data.token) {
      localStorage.setItem("token", data.token);

      setUser(data.user);

      setPage(
        data.user.role === "admin"
          ? "admin"
          : "user"
      );
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="container">
      <h1>🗑️ Dustbin Identifier</h1>

      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Login
        </button>
      </form>

      <button onClick={() => setPage("register")}>
        Register
      </button>
    </div>
  );
}

export default Login;