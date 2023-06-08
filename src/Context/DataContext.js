import { useStepContext } from "@mui/material";
import { useState, useEffect, createContext } from "react";

export const DataContext = createContext();

export default function DataContextProvider(props) {
  const [pokemons, setPokemons] = useState(); // figure out what the resolve of the promise giving back as datatype
  const [pokemonTypeObject, setPokemonTypeObject] = useState();
  const [hero, setHero] = useState(null); // getting data from JSON - pokemons
  const [heroAttributes, setHeroAttributes] = useState(null); //getting data from MongoDB - pokes
  const [enemy, setEnemy] = useState(null); //getting data from JSON - pokemons
  const [enemyAttributes, setEnemyAttributes] = useState(null); //getting data from MongoDB - pokes
  const [winner, setWinner] = useState(null);
  const [loser, setLoser] = useState(null);

  const fetchPokemons = async () => {
    const url =
      "https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json";
    const response = await fetch(`${url}`);
    const data = await response.json();
    setPokemons(data);
    setPokemonTypeObject(await getPokemonFromType(data));
  };

  function getPokemonFromType(data) {
    const filter = (type) => {
      const filtered = data.filter(
        (pokemon) => pokemon?.type[0] === type || pokemon?.type[1] === type
      );
      return filtered;
    };

    const obj = {
      Normal: filter("Normal"),
      Fire: filter("Fire"),
      Water: filter("Water"),
      Grass: filter("Grass"),
      Electric: filter("Electric"),
      Ice: filter("Ice"),
      Fighting: filter("Fighting"),
      Poison: filter("Poison"),
      Ground: filter("Ground"),
      Flying: filter("Flying"),
      Psychic: filter("Psychic"),
      Bug: filter("Bug"),
      Rock: filter("Rock"),
      Ghost: filter("Ghost"),
      Dark: filter("Dark"),
      Dragon: filter("Dragon"),
      Steel: filter("Steel"),
      Fairy: filter("Fairy"),
    };
    return obj;
  }

  useEffect(() => {
    fetchPokemons();
  }, []);
  // console.log("our data object ", pokemons);

  return (
    <DataContext.Provider
      value={{
        pokemons,
        hero,
        setHero,
        enemy,
        setEnemy,
        pokemonTypeObject,
        heroAttributes,
        setHeroAttributes,
        enemyAttributes,
        setEnemyAttributes,
        setWinner,
        winner,
        loser,
        setLoser,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}
