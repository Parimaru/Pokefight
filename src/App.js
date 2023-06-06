import "./App.css";
import { Routes, Route } from "react-router-dom";
import Category from "./Components/CategoryPage";
import LandingPage from "./Components/LandingPage";
import FightPage from "./Components/FightPage";
import Leaderboard from "./Components/Leaderboard";

function App() {
  // function handleOnlick() {
  //   if (body.className === "darkMode") {
  //     body.className = "";
  //   } else {
  //     body.className = "darkMode";
  //   }
  // }
  return (
    <>
      <div className="App">
        <img src="/img/header.png" className="headerPages" />
        {/* <img
          src="./img/icon/Dark.png"
          className="toggleTheme"
          onClick={handleOnlick}
        /> */}{" "}
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
