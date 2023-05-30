import { DataContext } from "../Context/DataContext";
import { useState, useEffect } from "react";

export default function FightPage () {

// const [startFight, setStartFight] = useState("");

let startFight = "HO";


const testFighters = [{
    "id": 1,
    "name": {
      "english": "Bulbasaur",
      "japanese": "フシギダネ",
      "chinese": "妙蛙种子",
      "french": "Bulbizarre"
    },
    "type": [
      "Grass",
      "Poison"
    ],
    "base": {
      "HP": 45,
      "Attack": 49,
      "Defense": 49,
      "Sp. Attack": 65,
      "Sp. Defense": 65,
      "Speed": 45
    }
  },
  {
    "id": 22,
    "name": {
      "english": "Fearow",
      "japanese": "オニドリル",
      "chinese": "大嘴雀",
      "french": "Rapasdepic"
    },
    "type": [
      "Normal",
      "Flying"
    ],
    "base": {
      "HP": 65,
      "Attack": 90,
      "Defense": 65,
      "Sp. Attack": 61,
      "Sp. Defense": 61,
      "Speed": 100
    }
  },
  {
    "id": 61,
    "name": {
      "english": "Poliwhirl",
      "japanese": "ニョロゾ",
      "chinese": "蚊香君",
      "french": "Têtarte"
    },
    "type": [
      "Water"
    ],
    "base": {
      "HP": 65,
      "Attack": 65,
      "Defense": 65,
      "Sp. Attack": 50,
      "Sp. Defense": 50,
      "Speed": 90
    }
  }]

 const fighterOne = testFighters[0] //'choose this pokemon' button click result (object with properties)
 const fighterTwo = testFighters[1] //'choose this opponent' || 'random' button click result (object with properties)
// health points of the individual fighters
const [fighterOneHealth, setFighterOneHealth] = useState(fighterOne?.base.HP);
const [fighterTwoHealth, setFighterTwoHealth] = useState(fighterTwo?.base.HP);

// winner state
const [winner, setWinner] = useState(null)

// countdown 5 secs -> FIGHT

//fight sequence

const fightSequence = () => {
    console.log("Start fight Sequence");
    //check who starts
    if(fighterOne?.base.Speed !== fighterTwo?.base.Speed) {
        console.log("speed not equal")
        if(fighterOne?.base.Speed > fighterTwo?.base.Speed){
            console.log("set fighter one");
            startFight=fighterOne?.name.english;
            console.log(startFight)
        } else {
            console.log("set fighter two");
            startFight=fighterTwo?.name.english;
            console.log(startFight)            
        }
    } else {
        function tossCoin(){
            let x = (Math.floor(Math.random()*2) === 0);
            if(x){
                startFight=fighterOne?.name.english;
            } else {
                startFight=fighterTwo?.name.english;
            }
        }
        tossCoin();
    };
    console.log(`Fighter ${startFight} starts fight`);
    
    let myAttack = fighterOne?.base.Attack;
    let opponentsAttack = fighterTwo?.base.Attack;
    let myDefense = fighterOne?.base.Defense;
    let opponentDefense = fighterTwo?.base.Defense;

    // defense check
    if(startFight === fighterOne?.name.english){
        if(opponentDefense >= myAttack) {
            myAttack = fighterOne?.base.Attack / 2;
            console.log("defense Check: ", myAttack);
        }   
    } else {
        if(myDefense >= opponentsAttack) {
            opponentsAttack = fighterTwo?.base.Attack / 2;
        }   
    }; 
    
    console.log("myAttack outside", myAttack)
    console.log("opponentsAttack", opponentsAttack)
    
    // attack
    do {
        console.log("start do-while loop")
        if (startFight === fighterOne.name.english){
            setFighterTwoHealth((prev) => prev - myAttack);
            console.log("fighterTwo Health:", fighterTwoHealth);
            startFight = fighterTwo.name.english;
        } else {
            setFighterOneHealth((prev) => prev - opponentsAttack);
            console.log("fighterOne Health:", fighterOneHealth);
            startFight = fighterOne.name.english;
        }
    } while (fighterOneHealth >= 0 || fighterTwoHealth >= 0)
    //set winner

    if (fighterOneHealth <= 0) {
        setWinner(fighterTwo.name.english)
    } else {
        setWinner(fighterOne.name.english)
    }
}

useEffect( () => {
    fightSequence();
}, []) 

console.log("winner:", winner);

return (
    <>
    <div className="fighterone">
        <p>{fighterOne?.name.english}</p>
        <p>Speed: {fighterOne?.base.Speed}</p>
        <p>HP: {fighterOne?.base.HP}</p>
        <p>Attack: {fighterOne?.base.Attack}</p>
        <p>Defense: {fighterOne?.base.Defense}</p>
    </div>
    <div className="fightertwo">
        <p>{fighterTwo?.name.english}</p>
        <p>Speed: {fighterTwo?.base.Speed}</p>
        <p>HP: {fighterTwo?.base.HP}</p>
        <p>Attack: {fighterTwo?.base.Attack}</p>
        <p>Defense: {fighterTwo?.base.Defense}</p>
    </div>
    <div className="winner">
        <h2>Winner: {winner}</h2>
    </div>
    </>
)
}

