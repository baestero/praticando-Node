import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  React.useEffect(() => {
    if (token) {
      navigate("/games", { state: { message: "Sessão restaurada" } });
    }
  });

  React.useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    (async () => {
      try {
        const res = await fetch("http://localhost:3000/user/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        const response = await res.json();

        if (res.ok) {
          const token = response.token;
          localStorage.setItem("token", token);
          navigate("/games", { state: { message: "Login bem-sucedido!" } });
        } else {
          setError(response.message);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          autoComplete="username"
        />

        <label>Senha</label>
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          autoComplete="current-password"
        />

        <button style={{ marginRight: "5px" }}>Login</button>
      </form>
      {error && <p className="alert-error">{error}</p>}
    </>
  );
};

export default Login;
