import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import GamesAdd from "./components/GamesAdd";
import GamesEdit from "./components/GamesEdit";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/games"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      <Route
        path="/games/add"
        element={
          <PrivateRoute>
            <GamesAdd />
          </PrivateRoute>
        }
      />
      <Route
        path="/games/edit/:id"
        element={
          <PrivateRoute>
            <GamesEdit />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;
