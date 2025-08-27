import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [games, setGames] = React.useState(null);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YWUwZjFhZDI1NDhkNGNlYTgxMzE3NyIsImVtYWlsIjoibGVvbm92b0BsZW8uY29tIiwiaWF0IjoxNzU2MjM3NjA0LCJleHAiOjE3NTYzMjQwMDR9.H6TLHqgArQT22jJhypeAKxA_h2QAycOIrGxcqZu9aus";

  React.useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:3000/games`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      try {
        const json = await response.json();
        setGames(json.games);
      } catch (err) {
        console.error("Erro", err);
      }
    })();
  }, []);

  async function removeGame(id) {
    const confirmDelete = window.confirm("Deseja realmente remover esse game?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/games/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await response.json();

      if (response.ok) {
        setGames(games.filter((game) => game._id !== id));
        alert(json.msg);
      }
    } catch (err) {
      console.log("Erro" + err);
    }
  }

  return (
    <>
      <h1>API REST GAMES</h1>
      <ul>
        {games &&
          games.map((game) => {
            return (
              <li key={game._id} className="game-card">
                <h4>Game: {game.title}</h4>
                <p>Year: {game.year}</p>
                <p>Price $: {game.price},00</p>
                <Link to={`/games/edit/${game._id}`}>
                  <button style={{ marginRight: "5px" }}>Editar</button>
                </Link>
                <button onClick={() => removeGame(game._id)}>Remover</button>
              </li>
            );
          })}
      </ul>
      <Link to={"/games/add"}>
        <button>+</button>
      </Link>
    </>
  );
};

export default Home;
