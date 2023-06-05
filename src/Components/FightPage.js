import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../Context/DataContext";
import { PopoverContext } from "../Context/PopoverContext";
import { useContext } from "react";
import { Slider, Button } from "@mui/material/";

export default function FightPage() {
  const { hero, heroAttributes, enemy, enemyAttributes } =
    useContext(DataContext);

  const [startFighter, setStartFighter] = useState(null);
  const [countRound, setCountRound] = useState(1);
  const [winner, setWinner] = useState(null);
  const [loser, setLoser] = useState(null);

  const [heroHealth, setHeroHealth] = useState(heroAttributes?.base.HP);
  const [enemyHealth, setEnemyHealth] = useState(enemyAttributes?.base.HP);

  //console.log(`initial health fighter 1 ${fighterOneHealth}`);
  //console.log(`initial health fighter 2 ${fighterTwoHealth}`);

  const [heroAttack, setHeroAttack] = useState(heroAttributes.base.Attack);
  const [enemyAttack, setEnemyAttack] = useState(enemyAttributes.base.Attack);
  const [heroDefense, setHeroDefense] = useState(heroAttributes.base.Defense);
  const [enemyDefense, setEnemyDefense] = useState(
    enemyAttributes.base.Defense
  );

  //console.log(`initial Attack fighter 1 ${myAttack}`);
  //console.log(`initial Attack fighter 2 ${opponentAttack}`);
  //find out who starts
  const whoStarts = () => {
    if (heroAttributes.base.Speed !== enemyAttributes.base.Speed) {
      console.log("speed is not equal");
      if (heroAttributes?.base.Speed > enemyAttributes.base.Speed) {
        console.log("Hero starts first turn");
        setStartFighter(heroAttributes.name.english);
      } else {
        console.log("Enemy starts first turn");
        setStartFighter(enemyAttributes.name.english);
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
    whoStarts();
  }, []);

  //defense check

  // ###issue### dynamic defense setting doesn't update
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

    //setMatchReady(true);
    console.log("defense check done");
  };

  useEffect(() => {
    defenseCheck();
  }, []);
  //console.log(`${startFighter} starts the first turn`);

  const fightSequence = () => {
    let currentHP = 0;
    if (heroHealth >= 0 || enemyHealth >= 0) {
      switch (countRound) {
        case 1:
          console.log("### Start fight sequence ###");
          console.log("Round#1");
          console.log("coin toss if SPECIAL ATTACK");
          console.log("coin toss if SPECIAL DEFENSE");
          console.log("SPECIAL DEFENSE");
          currentHP = heroHealth - enemyAttack;
          console.log(`Hero lost ${enemyAttack} HPs`);
          setHeroHealth(currentHP);
          setCountRound((prev) => prev + 1);

          break;
        case 2:
          console.log("Round#2");
          console.log("coin toss if SPECIAL ATTACK");
          console.log("SPECIAL ATTACK");
          console.log("coin toss if SPECIAL DEFENSE");
          currentHP = enemyHealth - heroAttack;
          console.log(`Enemy lost ${heroAttack} HPs`);
          setEnemyHealth(currentHP);
          setCountRound((prev) => prev + 1);

          break;
        case 3:
          console.log("Round#3");
          console.log("coin toss if SPECIAL ATTACK");
          console.log("SPECIAL ATTACK");
          console.log("coin toss if SPECIAL DEFENSE");
          console.log("SPECIAL DEFENSE");
          currentHP = heroHealth - enemyAttack;
          console.log(`Hero lost ${enemyAttack} HPs`);
          setHeroHealth(currentHP);
          setCountRound((prev) => prev + 1);

          break;
        default:
          if (heroHealth <= 0) {
            setWinner(enemyAttributes.name.english);
            setLoser(heroAttributes.name.english);
          } else {
            setWinner(heroAttributes.name.english);
            setLoser(enemyAttributes.name.english);
          }
          break;
      }
    }
  };

  useEffect(() => {
    fightSequence();
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

  return (
    <>
      <h1>Round {countRound}</h1>
      <div
        className="fightersWrapper"
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <div className="hero">
          <h2>{heroAttributes?.name.english}</h2>
          <img
            src={hero.pictureAnimFront}
            style={{ width: "200px", height: "200px" }}
          />
          <Slider
            sx={{ color: "green" }}
            disabled
            defaultValue={heroAttributes?.base.HP}
            max={heroAttributes?.base.HP}
            aria-label="Hp hero slider"
            value={heroHealth}
            valueLabelDisplay="on"
          />
          {/* <p>Speed: {fighterOne?.base.Speed}</p>
          <p>HP: {fighterOne?.base.HP}</p>
          <h3>dynamic HP: {fighterOneHealth}</h3>
          <p>Attack: {fighterOne?.base.Attack}</p>
          <p>dynamic Attack: {myAttack}</p>
          <p>Defense: {fighterOne?.base.Defense}</p> */}
        </div>
        <div>
          <h1>VS</h1>
        </div>
        <div className="enemy">
          <h2>{enemyAttributes?.name.english}</h2>
          <img
            src={enemy.pictureAnimBack}
            style={{ width: "200px", height: "200px" }}
          />
          <Slider
            disabled
            defaultValue={enemyAttributes?.base.HP}
            max={heroAttributes?.base.HP}
            aria-label="Hp enemy slider"
            value={enemyHealth}
            valueLabelDisplay="on"
          />
          {/* <p>Speed: {fighterTwo?.base.Speed}</p>
          <p>HP: {fighterTwo?.base.HP}</p>
          <h3>dynamic HP: {fighterTwoHealth}</h3>
          <p>Attack: {fighterTwo?.base.Attack}</p>
          <p>dynamic Attack: {opponentAttack}</p>
          <p>Defense: {fighterTwo?.base.Defense}</p> */}
        </div>
      </div>
      <div className="winner" style={{ textAlign: "center" }}>
        <h2>Winner: {winner}</h2>
        <Button onClick={handleClickLeaderboard} variant="contained">
          Leaderboard
        </Button>
        <Button onClick={handleClickRestart} variant="contained">
          Start again
        </Button>
      </div>
    </>
  );
}
