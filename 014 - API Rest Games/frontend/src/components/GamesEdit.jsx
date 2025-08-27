import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const GamesEdit = () => {
  const [title, setTitle] = React.useState("");
  const [year, setYear] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [error, setError] = React.useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YWUwZjFhZDI1NDhkNGNlYTgxMzE3NyIsImVtYWlsIjoibGVvbm92b0BsZW8uY29tIiwiaWF0IjoxNzU2MjM3NjA0LCJleHAiOjE3NTYzMjQwMDR9.H6TLHqgArQT22jJhypeAKxA_h2QAycOIrGxcqZu9aus";

  React.useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`http://localhost:3000/games/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await response.json();

        if (response.ok) {
          setTitle(json.title);
          setYear(json.year);
          setPrice(json.price);
        } else {
          alert(json.msg);
        }
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, [id]);

  function handleClick(event) {
    event.preventDefault();

    (async () => {
      try {
        const response = await fetch(`http://localhost:3000/games/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, year, price }),
        });

        const json = await response.json();

        if (!response.ok) {
          alert(json.message);
          return;
        }

        alert("Game editado com sucesso");
        navigate("/games");
      } catch (err) {
        setError("Erro de rede: " + err.message);
      }
    })();
  }

  return (
    <>
      <h2>Editar Game</h2>

      <form onSubmit={handleClick}>
        <label>Titulo</label>
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <label>Ano</label>
        <input
          type="number"
          value={year}
          onChange={({ target }) => setYear(target.value)}
        />
        <label>Preço</label>
        <input
          type="number"
          value={price}
          onChange={({ target }) => setPrice(target.value)}
        />
        <button>Adicionar</button>
      </form>
      {error && <p>{error}</p>}
    </>
  );
};

export default GamesEdit;
