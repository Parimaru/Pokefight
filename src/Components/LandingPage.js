import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { NavLink, useNavigate } from "react-router-dom";
import "./Pages.css";
import { DataContext } from "../Context/DataContext";
import { PopoverContext } from "../Context/PopoverContext";
import { DatabaseContext } from "../Context/DatabaseContext";
import { useContext, useEffect } from "react";

const categories = [
  "Normal",
  "Fire",
  "Water",
  "Grass",
  "Electric",
  "Ice",
  "Fighting",
  "Poison",
  "Ground",
  "Flying",
  "Psychic",
  "Bug",
  "Rock",
  "Ghost",
  "Dark",
  "Dragon",
  "Steel",
  "Fairy",
];

export default function NestedGrid() {
  const {
    hero,
    enemy,
    setEnemy,
    enemyAttributes,
    setEnemyAttributes,
    pokemons,
  } = useContext(DataContext);
  const { pokes, fetchPokes } = useContext(DatabaseContext);
  const navigate = useNavigate();

  console.log("Pokemons", pokemons);

  function handleClickRandom() {
    const randomEnemy = Math.floor(Math.random() * 809);
    const filteredPokemon = pokemons.find(
      (onePokemon) => onePokemon.id === randomEnemy
    );
    const filteredPoke = pokes.find(
      (onePokemon) => onePokemon.id === randomEnemy
    );
    console.log(filteredPoke, filteredPokemon);
    setEnemy(filteredPoke);
    setEnemyAttributes(filteredPokemon);
    console.log("randomEnemy", randomEnemy);
    console.log("useState", enemyAttributes);
    navigate("/fight");
  }

  useEffect(() => {
    fetchPokes();
  }, []);

  return (
    <>
      {hero ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h2 style={{ textAlign: "center" }}>
            Choose your enemy from one of these categories or
          </h2>
          <button
            style={{
              backgroundImage: "url(../img/button.png)",
              backgroundSize: "contain",
              backgroundColor: "transparent",
              height: "67px",
              width: "324px",
              border: "none",
            }}
            className="buttonRandom"
            type="button"
            onClick={handleClickRandom}
            variant="contained"
          >
            <h2>Random enemy</h2>
          </button>
        </div>
      ) : (
        <h2 style={{ textAlign: "center" }}>
          Choose your Pokémon from one of these categories
        </h2>
      )}
      <Box
        sx={{
          flexWrap: "wrap",
          marginTop: "50px",
          marginInline: "10vw",
          padding: "0",
        }}
      >
        <Grid container>
          <Grid container>
            {categories.map((category, index) => (
              <Grid item xs={2} className="hover" key={index}>
                <NavLink to={`/${category}`}>
                  <Box>
                    <img
                      src={"../img/card/" + category + ".png"}
                      className="categoryCard"
                    />
                  </Box>
                </NavLink>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
