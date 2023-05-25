import { useParams } from "react-router-dom";
import { DataContext } from "../Context/DataContext";
import { useContext, useEffect, useState } from "react";
import { Card, Box, Grid } from "@mui/material";
import { NavLink } from "react-router-dom";
import PokemonPopover from "./PokemonPopover";

export default function Category() {
  const { pokemons } = useContext(DataContext);
  //const pokemons = ["Pikatchu", "Ratzfratz", "Pumeluff"];
  const [popover, setPopover] = useState(false);

  const handleClick = () => {
    console.log("I'm the handleClick");
    setPopover(true);
  };

  // useEffect (() => {
  //   handleClick()
  // }, [])

  const { category } = useParams();
  return (
    <>
      <h3>{category}</h3>
      <Box sx={{ flexWrap: "wrap" }}>
        <Grid container spacing={1}>
          <Grid container item spacing={3}>
            {pokemons?.map((pokemon) => (
              <Grid item xs={2}>
                <Card onClick={handleClick}>
                  <Box sx={{ width: 300, height: 200 }}>{pokemon.name}</Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
      {popover ? <p>true</p> : <p>false</p>}
    </>
  );
}
