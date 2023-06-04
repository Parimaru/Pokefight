import { useStepContext } from "@mui/material";
import { useState, useEffect, createContext } from "react";

export const DataContext = createContext();

export default function DataContextProvider(props) {
  const [pokemons, setPokemons] = useState();
  const [hero, setHero] = useState(false);
  const [enemy, setEnemy] = useState();
  const fetchPokemons = async () => {
    const url =
      "https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json";
    const response = await fetch(`${url}`);
    const data = await response.json();
    setPokemons(data);
  };

  useEffect(() => {
    fetchPokemons();
  }, []);
  // console.log("our data object ", pokemons);

  return (
    <DataContext.Provider value={{ pokemons, hero, setHero, enemy, setEnemy }}>
      {props.children}
    </DataContext.Provider>
  );
}
