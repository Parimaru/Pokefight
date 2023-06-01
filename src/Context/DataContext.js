import { useState, useEffect, createContext } from "react";

export const DataContext = createContext();

export default function DataContextProvider(props) {
  const [pokemons, setPokemons] = useState(); // figure out what the resolve of the promise giving back as datatype

  const fetchPokemons = async () => {
    const url =
      "https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json";
    //const url = "https://pokeapi.co/api/v2/pokemon";
    const response = await fetch(`${url}`);
    const data = await response.json();
    setPokemons(data);
  };

  useEffect(() => {
    fetchPokemons();
  }, []);
  // console.log("our data object ", pokemons);

  return (
    <DataContext.Provider value={{ pokemons }}>
      {props.children}
    </DataContext.Provider>
  );
}
