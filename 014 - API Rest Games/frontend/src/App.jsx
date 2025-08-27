import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import GamesAdd from "./components/GamesAdd";
import GamesEdit from "./components/GamesEdit";

const App = () => {
  return (
    <Routes>
      <Route path="/games" element={<Home />} />
      <Route path="/games/add" element={<GamesAdd />} />
      <Route path="/games/edit/:id" element={<GamesEdit />} />
    </Routes>
  );
};

export default App;
