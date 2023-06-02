import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { NavLink, useNavigate } from "react-router-dom";
import "./Pages.css";
import { DataContext } from "../Context/DataContext";
import { useContext } from "react";

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
  const { hero, enemy, setEnemy, pokemons } = useContext(DataContext);
  const navigate = useNavigate();

  console.log("Pokemons", pokemons)

  function handleClickRandom () {
    const randomEnemy = pokemons[Math.floor(Math.random() * 809)];
    setEnemy(randomEnemy);
    console.log ("randomEnemy", randomEnemy)
    console.log ("useState", enemy)
    navigate("/fight");
  }

  return (
    <>
      {hero?
      <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
        <h2 style={{ textAlign: "center" }}>
          Choose your enemy from one of these categories or 
        </h2> 
        <Button onClick={handleClickRandom} variant="contained">Random enemy</Button>
      </div>
      :
      <h2 style={{ textAlign: "center" }}>
        Choose your Pokémon from one of these categories
      </h2>}
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
            {categories.map((category) => (
              <Grid xs={2} className="hover">
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
