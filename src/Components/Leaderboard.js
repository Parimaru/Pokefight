import { useEffect, useState, useContext } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../Context/DataContext";
export default function Leaderboard() {
  const [data, setData] = useState(null);
  const { setWinner, setHero, setEnemy } = useContext(DataContext);

  async function getAllFighters() {
    const data = await fetch(`https://pokefight-test.onrender.com/fighters`);
    const res = await data.json();
    setData(res.data);
    console.log("getAllFighters", res);
  }
  const navigate = useNavigate();
  useEffect(() => {
    getAllFighters();
  }, []);

  function handleClickRestart() {
    setWinner(null);
    setHero(null);
    setEnemy(null);
    navigate("/");
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <h3>POKEMON</h3>
          {data?.map((poke) => (
            <div
              key={poke._id}
              style={{
                display: "flex",
                justifyContent: "space",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <p>{poke.name}</p>
            </div>
          ))}
        </div>
        <div>
          <h3>WINS</h3>
          {data?.map((poke) => (
            <div
              key={poke._id}
              style={{
                display: "flex",
                justifyContent: "space",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <p>{poke.wins}</p>
            </div>
          ))}
        </div>
        <div>
          <h3>LOSES</h3>
          {data?.map((poke) => (
            <div
              key={poke._id}
              style={{
                display: "flex",
                justifyContent: "space",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <p>{poke.loses}</p>
            </div>
          ))}
        </div>
      </div>
      <Button onClick={handleClickRestart} variant="contained">
        Home
      </Button>
    </>
  );
}
