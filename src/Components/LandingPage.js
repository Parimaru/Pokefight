import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { NavLink } from "react-router-dom";
import "./Pages.css";

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
  return (
    <>
      <h2 style={{ textAlign: "center" }}>
        Choose your Pokémon from one of this categories
      </h2>
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
