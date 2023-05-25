import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Box, Grid } from "@mui/material";
import { NavLink } from "react-router-dom";
import PokemonPopover from "./PokemonPopover";
import { useContext } from "react";
import { PopoverContext } from "../Context/PopoverContext";

export default function Category() {
  const pokemons = ["Pikatchu", "Ratzfratz", "Pumeluff"];

  const { category } = useParams();
  const { popover, setPopover } = useContext(PopoverContext);

  const handleClick = () => {
    console.log("I'm the handleClick");
    setPopover(true);
  };

  // useEffect (() => {
  //   handleClick()
  // }, [])

  return (
    <>
      <h3>{category}</h3>
      <Box sx={{ flexWrap: "wrap" }}>
        <Grid container spacing={1}>
          <Grid container item spacing={3}>
            {pokemons.map((pokemon) => (
              <Grid item xs={2}>
                <Card onClick={handleClick}>
                  <Box sx={{ width: 300, height: 200 }}>{pokemon}</Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
      <PokemonPopover />
    </>
  );
}
