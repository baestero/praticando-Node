import React from "react";
import { useNavigate } from "react-router-dom";

const GamesAdd = () => {
  const [title, setTitle] = React.useState("");
  const [year, setYear] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YWUwZjFhZDI1NDhkNGNlYTgxMzE3NyIsImVtYWlsIjoibGVvbm92b0BsZW8uY29tIiwiaWF0IjoxNzU2MjM3NjA0LCJleHAiOjE3NTYzMjQwMDR9.H6TLHqgArQT22jJhypeAKxA_h2QAycOIrGxcqZu9aus";

  function handleClick(event) {
    event.preventDefault();

    (async () => {
      try {
        const response = await fetch("http://localhost:3000/games", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, year, price }),
        });

        const json = await response.json();

        if (!response.ok) {
          setError(json.message);
          return;
        }

        alert("Game cadastrado com sucesso");

        navigate("/games");
      } catch (err) {
        setError("Erro de rede: " + err.message);
      }
    })();
  }

  return (
    <>
      <h2>Novo Game</h2>

      <form onSubmit={handleClick}>
        <label>Titulo</label>
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          required
        />
        <label>Ano</label>
        <input
          type="number"
          value={year}
          onChange={({ target }) => setYear(target.value)}
          required
        />
        <label>Preço</label>
        <input
          type="number"
          value={price}
          onChange={({ target }) => setPrice(target.value)}
          required
        />
        <button>Adicionar</button>
      </form>
      {error && <p>{error}</p>}
    </>
  );
};

export default GamesAdd;
