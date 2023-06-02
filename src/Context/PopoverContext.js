import { useState, createContext } from "react";

export const PopoverContext = createContext();

export default function PopoverContextProvider(props) {
  const [popover, setPopover] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("Start");
  const [currentPokemon, setCurrentPokemon] = useState({
    name: "Venusaur",
    id: 3,
    pictureArt:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
    pictureAnimFront:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokem…",
    pictureAnimBack:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokem…",
    type1: "grass",
    type2: "poison",
    height: 20,
    weight: 1000,
    attack1: "Swords-dance",
    attack2: "Cut",
    happiness: "50",
    habitat: "grassland",
    text1:
      "The plant blooms when it is absorbing solar-energy. It stays on the move to seek sunlight.",
    text2:
      "The flower on its back catches the sun's rays. The sunlight is then ab…",
    text3:
      "After a rainy day, the flower on its back smells stronger. The scent attracts other Pokémon.",
    evolvesFrom: "Ivysaur",
  });

  return (
    <PopoverContext.Provider
      value={{
        popover,
        setPopover,
        currentCategory,
        setCurrentCategory,
        currentPokemon,
        setCurrentPokemon,
      }}
    >
      {props.children}
    </PopoverContext.Provider>
  );
}
