import "./App.css";
import { Routes, Route } from "react-router-dom";
import Category from "./Components/CategoryPage";
import LandingPage from "./Components/LandingPage";
import FightPage from "./Components/FightPage";
import Leaderboard from "./Components/Leaderboard";

function App() {
  return (
    <>
      <div className="App">
        <h1>Pokemon Let's Go!!!!</h1>
      </div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/:category" element={<Category />} />
        <Route path="/fight" element={<FightPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </>
  );
}

export default App;
