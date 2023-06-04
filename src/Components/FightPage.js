import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../Context/DataContext";
import { useContext } from "react";

// 10 pokis in the array
const testFighters = [
  {
    id: 1,
    name: {
      english: "Bulbasaur",
      japanese: "フシギダネ",
      chinese: "妙蛙种子",
      french: "Bulbizarre",
    },
    type: ["Grass", "Poison"],
    base: {
      HP: 45,
      Attack: 49,
      Defense: 49,
      "Sp. Attack": 65,
      "Sp. Defense": 65,
      Speed: 45,
    },
  },
  {
    id: 22,
    name: {
      english: "Fearow",
      japanese: "オニドリル",
      chinese: "大嘴雀",
      french: "Rapasdepic",
    },
    type: ["Normal", "Flying"],
    base: {
      HP: 65,
      Attack: 90,
      Defense: 65,
      "Sp. Attack": 61,
      "Sp. Defense": 61,
      Speed: 100,
    },
  },
  {
    id: 61,
    name: {
      english: "Poliwhirl",
      japanese: "ニョロゾ",
      chinese: "蚊香君",
      french: "Têtarte",
    },
    type: ["Water"],
    base: {
      HP: 65,
      Attack: 65,
      Defense: 65,
      "Sp. Attack": 50,
      "Sp. Defense": 50,
      Speed: 90,
    },
  },
  {
    id: 4,
    name: {
      english: "Charmander",
      japanese: "ヒトカゲ",
      chinese: "小火龙",
      french: "Salamèche",
    },
    type: ["Fire"],
    base: {
      HP: 39,
      Attack: 52,
      Defense: 43,
      "Sp. Attack": 60,
      "Sp. Defense": 50,
      Speed: 65,
    },
  },
  {
    id: 5,
    name: {
      english: "Charmeleon",
      japanese: "リザード",
      chinese: "火恐龙",
      french: "Reptincel",
    },
    type: ["Fire"],
    base: {
      HP: 58,
      Attack: 64,
      Defense: 58,
      "Sp. Attack": 80,
      "Sp. Defense": 65,
      Speed: 80,
    },
  },
  {
    id: 14,
    name: {
      english: "Kakuna",
      japanese: "コクーン",
      chinese: "铁壳蛹",
      french: "Coconfort",
    },
    type: ["Bug", "Poison"],
    base: {
      HP: 45,
      Attack: 25,
      Defense: 50,
      "Sp. Attack": 25,
      "Sp. Defense": 25,
      Speed: 35,
    },
  },
  {
    id: 15,
    name: {
      english: "Beedrill",
      japanese: "スピアー",
      chinese: "大针蜂",
      french: "Dardargnan",
    },
    type: ["Bug", "Poison"],
    base: {
      HP: 65,
      Attack: 90,
      Defense: 40,
      "Sp. Attack": 45,
      "Sp. Defense": 80,
      Speed: 75,
    },
  },
  {
    id: 35,
    name: {
      english: "Clefairy",
      japanese: "ピッピ",
      chinese: "皮皮",
      french: "Mélofée",
    },
    type: ["Fairy"],
    base: {
      HP: 70,
      Attack: 45,
      Defense: 48,
      "Sp. Attack": 60,
      "Sp. Defense": 65,
      Speed: 35,
    },
  },
  {
    id: 36,
    name: {
      english: "Clefable",
      japanese: "ピクシー",
      chinese: "皮可西",
      french: "Mélodelfe",
    },
    type: ["Fairy"],
    base: {
      HP: 95,
      Attack: 70,
      Defense: 73,
      "Sp. Attack": 95,
      "Sp. Defense": 90,
      Speed: 60,
    },
  },
  {
    id: 37,
    name: {
      english: "Vulpix",
      japanese: "ロコン",
      chinese: "六尾",
      french: "Goupix",
    },
    type: ["Fire"],
    base: {
      HP: 38,
      Attack: 41,
      Defense: 40,
      "Sp. Attack": 50,
      "Sp. Defense": 65,
      Speed: 65,
    },
  },
];

export default function FightPage() {
  const [matchReady, setMatchReady] = useState(false);
  const [nextTurn, setNextTurn] = useState(false);
  const [startFighter, setStartFighter] = useState(null);
  const [countRound, setCountRound] = useState(1);
  const [winner, setWinner] = useState(null);
  const [loser, setLoser] = useState(null)

  const fighterOne = testFighters[1];
  const fighterTwo = testFighters[8];

  const [fighterOneHealth, setFighterOneHealth] = useState(fighterOne?.base.HP);
  const [fighterTwoHealth, setFighterTwoHealth] = useState(fighterTwo?.base.HP);

  //console.log(`initial health fighter 1 ${fighterOneHealth}`);
  //console.log(`initial health fighter 2 ${fighterTwoHealth}`);

  const [myAttack, setMyAttack] = useState(fighterOne.base.Attack);
  const [opponentAttack, setOpponentAttack] = useState(fighterTwo.base.Attack);
  const [myDefense, setMyDefense] = useState(fighterOne.base.Defense);
  const [opponentDefense, setOpponentDefense] = useState(
    fighterTwo.base.Defense
  );

  //console.log(`initial Attack fighter 1 ${myAttack}`);
  //console.log(`initial Attack fighter 2 ${opponentAttack}`);
  //find out who starts
  const whoStarts = () => {
    if (fighterOne.base.Speed !== fighterTwo.base.Speed) {
      console.log("speed is not equal");
      if (fighterOne?.base.Speed > fighterTwo.base.Speed) {
        console.log("Hero starts first turn");
        setStartFighter(fighterOne.name.english);
      } else {
        console.log("Enemy starts first turn");
        setStartFighter(fighterTwo.name.english);
      }
    } else {
      console.log("speed is equal, coin toss!");
      function tossCoin() {
        let x = Math.floor(Math.random() * 2) === 0;
        if (x) {
          setStartFighter(fighterOne?.name.english);
        } else {
          setStartFighter(fighterTwo?.name.english);
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
    if (opponentDefense >= myAttack) {
      let myCurrentAttack = myAttack / 2;
      setMyAttack(myCurrentAttack);
    } else {
      if (myDefense >= opponentAttack) {
        let opponentCurrentAttack = opponentAttack / 2;
        setOpponentAttack(opponentCurrentAttack);
      }
    }

    //setMatchReady(true);
    console.log("defense check done");
  };

  useEffect(() => {
    defenseCheck();
  }, []);
  //console.log(`${startFighter} starts the first turn`);

  //console.log("match ready", matchReady);

  const fightSequence = () => {
    let currentHP = 0;
    if (fighterOneHealth >= 0 || fighterTwoHealth >= 0) {
      switch (countRound) {
        case 1:
          console.log("### Start fight sequence ###");
          console.log("Round#1");
          console.log("coin toss if SPECIAL ATTACK");
          console.log("coin toss if SPECIAL DEFENSE");
          console.log("SPECIAL DEFENSE");
          currentHP = fighterOneHealth - opponentAttack;
          console.log(`Hero lost ${opponentAttack} HPs`);
          setFighterOneHealth(currentHP);
          setCountRound((prev) => prev + 1);
          break;
        case 2:
          console.log("Round#2");
          console.log("coin toss if SPECIAL ATTACK");
          console.log("SPECIAL ATTACK");
          console.log("coin toss if SPECIAL DEFENSE");
          currentHP = fighterTwoHealth - myAttack;
          console.log(`Enemy lost ${myAttack} HPs`);
          setFighterTwoHealth(currentHP);
          setCountRound((prev) => prev + 1);
          break;
        case 3:
          console.log("Round#3");
          console.log("coin toss if SPECIAL ATTACK");
          console.log("SPECIAL ATTACK");
          console.log("coin toss if SPECIAL DEFENSE");
          console.log("SPECIAL DEFENSE");
          currentHP = fighterOneHealth - opponentAttack;
          console.log(`Hero lost ${opponentAttack} HPs`);
          setFighterOneHealth(currentHP);
          setCountRound((prev) => prev + 1);
          break;
        default:
          if (fighterOneHealth <= 0) {
            setWinner(fighterTwo.name.english);
            setLoser(fighterOne.name.english)
          } else {
            setWinner(fighterOne.name.english);
            setLoser(fighterTwo.name.english)
          }
          break;
      }
    }
  };

  useEffect(() => {
    fightSequence();
  }, [countRound]);

  const navigate = useNavigate()
  const {setHero, setEnemy } = useContext(DataContext);

  function handleClickLeaderboard () {
    navigate("/leaderboard")
  }

  function handleClickRestart () {
    setWinner(null)
    setHero(null)
    setEnemy(null)
    navigate("/")
  }

  async function submitResult () {
    const databody = {
      winner: winner,
      loser: loser,
      turns: countRound
    };
    console.log(" normal databody is :", databody);
    console.log(" databody JSON is :", JSON.stringify(databody));
    return await fetch("http://localhost:8000/results", {
      method: "POST",
      body: JSON.stringify(databody),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

if(winner && loser && countRound) {
  submitResult ()
}

  return (
    <>
      <div
        className="fightersWrapper"
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <div className="fighterone">
          <h2>{fighterOne?.name.english}</h2>
          <p>Speed: {fighterOne?.base.Speed}</p>
          <p>HP: {fighterOne?.base.HP}</p>
          <h3>dynamic HP: {fighterOneHealth}</h3>
          <p>Attack: {fighterOne?.base.Attack}</p>
          <p>dynamic Attack: {myAttack}</p>
          <p>Defense: {fighterOne?.base.Defense}</p>
        </div>
        <div>
          <h1>VS</h1>
        </div>
        <div className="fightertwo">
          <h2>{fighterTwo?.name.english}</h2>
          <p>Speed: {fighterTwo?.base.Speed}</p>
          <p>HP: {fighterTwo?.base.HP}</p>
          <h3>dynamic HP: {fighterTwoHealth}</h3>
          <p>Attack: {fighterTwo?.base.Attack}</p>
          <p>dynamic Attack: {opponentAttack}</p>
          <p>Defense: {fighterTwo?.base.Defense}</p>
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
