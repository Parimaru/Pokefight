import { useState, useEffect, createContext } from "react";
import { useParams } from "react-router";

export const DatabaseContext = createContext();

export default function DatabaseContextProvider(props) {
  const [pokes, setPokes] = useState();
  const { pokename } = useParams();

  console.log(pokename);

  const fetchPokes = async () => {
    const url = `http://localhost:8000/poke`;
    const response = await fetch(`${url}`);
    const data = await response.json();
    setPokes(data.data);
  };

  useEffect(() => {
    fetchPokes();
  }, []);
  console.log("my poke", pokes);

  return (
    <DatabaseContext.Provider value={{ pokes, fetchPokes }}>
      {props.children}
    </DatabaseContext.Provider>
  );
}
