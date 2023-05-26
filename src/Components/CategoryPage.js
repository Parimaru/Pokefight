import { useParams } from "react-router-dom";
import { DataContext } from "../Context/DataContext";
import { useContext, useEffect, useState } from "react";
import { Card, Box, Grid } from "@mui/material";
import { NavLink } from "react-router-dom";
import PokemonPopover from "./PokemonPopover";

export default function Category() {
  const { pokemons } = useContext(DataContext);
  const [popover, setPopover] = useState(false);
  const { category } = useParams();
  // new array with pokemon type filter for displaying pokemons in corresponding categories
  const pokemonTypeArray = pokemons?.filter(
    (pokemon) => pokemon?.type[0] === category || pokemon?.type[1] === category
  );

  const handleClick = () => {
    console.log("I'm the handleClick");
    setPopover(true);
  };

  console.log("category page pokemons", pokemons);
  console.log("Filtered typeArray ", pokemonTypeArray);
  console.log("useparams, category", typeof category);

  return (
    <>
      <h3>{category}</h3>
      <Box sx={{ flexWrap: "wrap" }}>
        <Grid container spacing={1}>
          <Grid container item spacing={3}>
            {pokemonTypeArray?.map((pokemon) => (
              <Grid item xs={2}>
                <Card onClick={handleClick}>
                  <Box sx={{ width: 300, height: 200 }}>
                    {pokemon.name.english}
                  </Box>
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
