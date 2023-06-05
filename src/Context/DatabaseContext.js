import { useState, useEffect, createContext } from "react";
import { useParams } from "react-router";

export const DatabaseContext = createContext();

export default function DatabaseContextProvider(props) {
  const [pokes, setPokes] = useState(null);
  const { pokename } = useParams();
  const [pokesTypeObject, setPokesTypeObject] = useState(null);

  // console.log(pokename);

  const fetchPokes = async () => {
    const url = `http://localhost:8000/poke/`;
    const response = await fetch(`${url}`);
    const data = await response.json();
    setPokes(data.data);
    setPokesTypeObject(await getPokesFromType(data.data));
  };

  function getPokesFromType(data) {
    const filter = (type) => {
      const filtered = data.filter(
        (poke) => poke?.type1 === type || poke?.type2 === type
      );
      return filtered;
    };

    const obj = {
      Normal: filter("normal"),
      Fire: filter("fire"),
      Water: filter("water"),
      Grass: filter("grass"),
      Electric: filter("electric"),
      Ice: filter("ice"),
      Fighting: filter("fighting"),
      Poison: filter("poison"),
      Ground: filter("ground"),
      Flying: filter("flying"),
      Psychic: filter("psychic"),
      Bug: filter("bug"),
      Rock: filter("rock"),
      Ghost: filter("ghost"),
      Dark: filter("dark"),
      Dragon: filter("dragon"),
      Steel: filter("steel"),
      Fairy: filter("fairy"),
    };
    return obj;
  }

  useEffect(() => {
    fetchPokes();
  }, []);
  //console.log("my poke", pokes);

  return (
    <DatabaseContext.Provider value={{ pokes, pokesTypeObject, fetchPokes }}>
      {props.children}
    </DatabaseContext.Provider>
  );
}
