import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../Context/DataContext";
import { PopoverContext } from "../Context/PopoverContext";
import { useContext } from "react";
import { LinearProgress, Button } from "@mui/material/";
import styles from "./FightPage.css";

export default function FightPage() {
  const {
    hero,
    heroAttributes,
    enemy,
    enemyAttributes,
    winner,
    loser,
    setWinner,
    setLoser,
  } = useContext(DataContext);

  const [startFighter, setStartFighter] = useState(null);
  const [countRound, setCountRound] = useState(null);

  const [heroHealth, setHeroHealth] = useState(heroAttributes?.base.HP);
  const [enemyHealth, setEnemyHealth] = useState(enemyAttributes?.base.HP);

  const [heroAttack, setHeroAttack] = useState(heroAttributes.base.Attack);
  const [enemyAttack, setEnemyAttack] = useState(enemyAttributes.base.Attack);
  const [heroDefense, setHeroDefense] = useState(heroAttributes.base.Defense);
  const [enemyDefense, setEnemyDefense] = useState(
    enemyAttributes.base.Defense
  );

  //find out who starts
  const whoStarts = () => {
    if (heroAttributes.base.Speed !== enemyAttributes.base.Speed) {
      console.log("speed is not equal");
      if (heroAttributes?.base.Speed > enemyAttributes.base.Speed) {
        console.log("Hero starts first turn");
        setStartFighter(heroAttributes.name.english);
        console.log("HERO", heroAttributes.name.english);
      } else {
        console.log("Enemy starts first turn");
        setStartFighter(enemyAttributes.name.english);
        console.log("ENEMY", enemyAttributes.name.english);
      }
    } else {
      console.log("speed is equal, coin toss!");
      function tossCoin() {
        let x = Math.floor(Math.random() * 2) === 0;
        if (x) {
          setStartFighter(heroAttributes?.name.english);
        } else {
          setStartFighter(enemyAttributes?.name.english);
        }
      }
      tossCoin();
    }
  };

  useEffect(() => {
    if (!startFighter) {
      whoStarts();
      setCountRound(0);
    }
  }, []);

  //defense check

  const defenseCheck = () => {
    if (enemyDefense >= heroAttack) {
      let heroCurrentAttack = heroAttack / 2;
      setHeroAttack(heroCurrentAttack);
    } else {
      if (heroDefense >= enemyAttack) {
        let enemyCurrentAttack = enemyAttack / 2;
        setEnemyAttack(enemyCurrentAttack);
      }
    }

    console.log("defense check done");
  };

  useEffect(() => {
    defenseCheck();
  }, []);

  const round = (currentHP) => {
    console.log(`${startFighter} starts the turn`);
    if (startFighter !== heroAttributes.name.english) {
      currentHP = heroHealth - enemyAttack / 4;
      console.log(`Hero lost ${enemyAttack} HPs`);
      setHeroHealth(currentHP);
      setStartFighter(heroAttributes.name.english);
    } else {
      currentHP = enemyHealth - heroAttack / 4;
      console.log(`Enemy lost ${heroAttack} HPs`);
      setEnemyHealth(currentHP);
      setStartFighter(enemyAttributes.name.english);
    }
  };

  const fightSequence = () => {
    let currentHP = 0;
    let currentCount = 1;

    if (heroHealth > 0 && enemyHealth > 0) {
      if (countRound == 0) {
        setCountRound(1);
      } else {
        round(currentHP);
        currentCount = countRound + 1;
        setCountRound(currentCount);
      }
    } else {
      if (heroHealth <= 0) {
        setWinner(enemyAttributes.name.english);
        setLoser(heroAttributes.name.english);
      } else {
        setWinner(heroAttributes.name.english);
        setLoser(enemyAttributes.name.english);
      }
    }
  };

  useEffect(() => {
    if (startFighter) {
      console.log("start fighter ready");
      setTimeout(() => {
        fightSequence();
      }, 2000);
    } else {
      console.log("start fighter not ready");
    }
  }, [countRound]);

  const navigate = useNavigate();
  const { setHero, setEnemy } = useContext(DataContext);

  function handleClickLeaderboard() {
    navigate("/leaderboard");
  }

  function handleClickRestart() {
    setWinner(null);
    setHero(null);
    setEnemy(null);
    navigate("/");
  }

  async function createFighter() {
    const data = await fetch(
      `https://pokefight-test.onrender.com/fighters/${heroAttributes.name.english}`
    );
    const res = await data.json();
    console.log("getFighter", res);
    if (res === null) {
      console.log("if statement createFighter");
      const databody = {
        name: heroAttributes.name.english,
        wins: 0,
        loses: 0,
      };

      const newdata = await fetch(
        `https://pokefight-test.onrender.com/fighters`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(databody),
        }
      );
      const newres = await newdata.json();
      console.log("newres", newres);
    }
  }

  async function updateWinner() {
    const databody = {
      wins: 0,
    };
    const data = await fetch(
      `https://pokefight-test.onrender.com/fighters/winner/${winner}`,

      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(databody),
      }
    );
    const res = await data.json();
    console.log("res", res);
  }

  async function updateLoser() {
    const databody = {
      loses: 0,
    };
    const data = await fetch(
      `https://pokefight-test.onrender.com/fighters/loser/${loser}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(databody),
      }
    );
    const res = await data.json();
    console.log("res", res);
  }

  useEffect(() => {
    createFighter();
    if (winner) {
      updateWinner();
    }
    if (loser) {
      updateLoser();
    }
  }, [winner, loser]);

  return (
    <>
      <div className="container">
        <div style={{ textAlign: "center" }}>
          {winner ? (
            <h1>{winner} won!</h1>
          ) : (
            <>
              {countRound > 1 ? (
                <h1>Round {countRound - 1}</h1>
              ) : (
                <h1>Let's go {heroAttributes?.name.english}!!</h1>
              )}
            </>
          )}
        </div>
        <div
          className="fightersWrapper"
          style={{
            backgroundImage: "url(../img/arenaBase.png)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <img className="simulator" src="../img/simulator.png"></img>
          <div className="player enemy">
            <div className="enemyStats">
              <div className="sliderEnemy">
                <LinearProgress
                  sx={{ height: "1vw" }}
                  variant="determinate"
                  aria-label="Hp enemy slider"
                  value={(enemyHealth * 100) / enemyAttributes?.base.HP}
                  color="success"
                />
              </div>
              <p className="name">{enemyAttributes?.name.english}</p>
            </div>
            <div className="enemyPicture">
              <img
                src={enemy.pictureAnimBack}
                style={{ width: "10vw", height: "10vw" }}
              />
            </div>
          </div>
          <div className="player hero">
            <div className="heroPicture">
              <img
                src={hero.pictureAnimFront}
                style={{ width: "10vw", height: "10vw" }}
              />
            </div>
            <div className="heroStats">
              <div className="sliderHero">
                <LinearProgress
                  sx={{ height: "1vw" }}
                  variant="determinate"
                  aria-label="Hp hero slider"
                  value={(heroHealth * 100) / heroAttributes?.base.HP}
                  color="success"
                />
              </div>
              <p className="name">{heroAttributes?.name.english}</p>
            </div>
          </div>
        </div>
        <div className="buttons" style={{ textAlign: "center" }}>
          <button
            style={{
              backgroundImage: "url(../img/button.png)",
              backgroundSize: "contain",
              backgroundColor: "transparent",
              height: "67px",
              width: "324px",
              border: "none",
            }}
            type="button"
            onClick={handleClickLeaderboard}
          >
            <h2>Leaderboard</h2>
          </button>
          <button
            style={{
              backgroundImage: "url(../img/button.png)",
              backgroundSize: "contain",
              backgroundColor: "transparent",
              height: "67px",
              width: "324px",
              border: "none",
            }}
            type="button"
            onClick={handleClickRestart}
          >
            <h2>Start again</h2>
          </button>
        </div>
      </div>
    </>
  );
}
