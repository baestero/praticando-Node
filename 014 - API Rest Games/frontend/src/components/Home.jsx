import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const [games, setGames] = React.useState(null);
  const [message, setMessage] = React.useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  React.useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);

      const timer = setTimeout(() => setMessage(""), 2000);

      return () => clearTimeout(timer);
    }
  }, [location.state]);

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
        navigate("/games", {
          state: { message: "Game deletado com sucesso!" },
        });
      }
    } catch (err) {
      console.log("Erro" + err);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      {message && <p className="alert-sucess">{message}</p>}
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
      <button onClick={handleLogout} style={{ marginLeft: "5px" }}>
        Logout
      </button>
    </>
  );
};

export default Home;
