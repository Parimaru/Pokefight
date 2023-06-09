import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../Context/DataContext";
import styles from "./Leaderboard.css";
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
      <div className="leaderboard">
        <div className="headers">
          <h3 style={{ width: "18vw" }}>POKEMON</h3>
          <h3 style={{ width: "15vw" }}>LOSES</h3>
          <h3 style={{ width: "10vw" }}>WINS</h3>
        </div>
        <div className="table">
          <div>
            {data?.map((poke) => (
              <div
                key={poke._id}
                style={{
                  display: "flex",
                  justifyContent: "space",
                  alignItems: "center",
                  marginBottom: "10px",
                  width: "18vw",
                }}
              >
                <p>{poke.name}</p>
              </div>
            ))}
          </div>
          <div>
            {data?.map((poke) => (
              <div
                key={poke._id}
                style={{
                  display: "flex",
                  justifyContent: "space",
                  alignItems: "center",
                  marginBottom: "10px",
                  width: "15vw",
                }}
              >
                <p>{poke.wins}</p>
              </div>
            ))}
          </div>
          <div>
            {data?.map((poke) => (
              <div
                key={poke._id}
                style={{
                  display: "flex",
                  justifyContent: "space",
                  alignItems: "center",
                  marginBottom: "10px",
                  width: "10vw",
                }}
              >
                <p>{poke.loses}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        style={{
          backgroundImage: "url(../img/button.png)",
          backgroundSize: "contain",
          backgroundColor: "transparent",
          height: "67px",
          width: "324px",
          border: "none",
          display: "block",
          marginInline: "auto",
          marginTop: "10vh",
          marginBottom: "10vh",
        }}
        type="button"
        onClick={handleClickRestart}
      >
        <h2 style={{ marginTop: "15px" }}>Home</h2>
      </button>
    </>
  );
}
