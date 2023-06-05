import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Box, Skeleton, Stack } from "@mui/material";
import { PopoverContext } from "../Context/PopoverContext";
import { DataContext } from "../Context/DataContext";
import { DatabaseContext } from "../Context/DatabaseContext";
import PokemonPopover from "./PokemonPopover";
import "./Pages.css";

export default function Category() {
  const { category } = useParams();
  const {
    popover,
    setPopover,
    currentCategory,
    setCurrentCategory,
    currentPokemonName,
    setCurrentPokemonName,
    setCurrentPokemon,
    setCurrentPoke,
  } = useContext(PopoverContext);
  const { pokes, pokesTypeObject } = useContext(DatabaseContext);
  const { pokemons, pokemonTypeObject } = useContext(DataContext);

  // console.log(pokemonTypeObject);

  // console.log(
  //   "All JSON:",
  //   pokemons,
  //   "Only JSON category:",
  //   [],
  //   "All MongoDB:",
  //   pokes,
  //   "Only MongoDB category",
  //   pokesCategory
  // );

  const handleClick = (event) => {
    setCurrentCategory(category);
    setPopover(true);
    setCurrentPokemonName(event.target.innerHTML.toLowerCase());
    console.log(event.target.innerHTML.toLowerCase());

    setCurrentPokemon(
      pokemonTypeObject[category]?.find(
        (obj) => obj.name.english == event.target.innerHTML
      )
    );
    console.log(pokesTypeObject);
    setCurrentPoke(
      pokesTypeObject[category]?.find(
        (obj) => obj.name == event.target.innerHTML.toLowerCase()
      )
    );
  };
  //console.log("category page pokemons", pokemons);
  //console.log("Filtered typeArray ", []);
  //console.log("useparams, category", typeof category);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Choose your Pokémon:</h1>
      <Box
        sx={{
          flexWrap: "wrap",
          marginInline: "10vw",
          padding: "0",
          display: "inline-flex",
          gap: "20px",
          justifyContent: "space-between",
        }}
      >
        {pokesTypeObject ? (
          pokemonTypeObject[category].map((pokemon, index) => (
            <div
              key={index}
              style={{
                backgroundImage: "url(../img/pokeCard/" + category + ".png)",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <Box
                onClick={handleClick}
                className="pokeChoose"
                sx={{
                  backgroundImage:
                    "url(" + pokesTypeObject[category][index]?.pictureArt + ")",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  textAlign: "center",
                  backgroundPositionY: "38px",
                  fontWeight: "700",
                }}
              >
                {pokemon.name.english}
              </Box>
            </div>
          ))
        ) : (
          <Skeleton variant="rounded" width={210} height={60} />
        )}
      </Box>
      <PokemonPopover />
    </>
  );
}
