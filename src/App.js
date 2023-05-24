import "./App.css";
import { Routes, Route } from "react-router-dom";
import Pokemon from "./Components/Pokemon";
import PokemonInfo from "./Components/PokemonInfo";

function App() {
  return (
    <>
      <div className="App">
        <h3>Pokemon Let's Go!!!</h3>
      </div>
      <Routes>
        <Route path="/" />
        <Route path="/pokemon/:id" element={<Pokemon />} />
        <Route path="/pokemon/:id/:info" element={<PokemonInfo />} />
      </Routes>
    </>
  );
}

export default App;
