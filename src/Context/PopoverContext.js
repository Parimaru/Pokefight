import { useState, createContext, useContext, useEffect } from "react";
import { DataContext } from "../Context/DataContext";
import { DatabaseContext } from "../Context/DatabaseContext";

export const PopoverContext = createContext();

export default function PopoverContextProvider(props) {
  const [popover, setPopover] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("Fire");
  const [currentPoke, setCurrentPoke] = useState(null);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [currentPokemonName, setCurrentPokemonName] = useState(null);

  return (
    <PopoverContext.Provider
      value={{
        popover,
        currentPoke,
        setCurrentPoke,
        setPopover,
        currentCategory,
        setCurrentCategory,
        currentPokemon,
        setCurrentPokemon,
        currentPokemonName,
        setCurrentPokemonName,
      }}
    >
      {props.children}
    </PopoverContext.Provider>
  );
}
