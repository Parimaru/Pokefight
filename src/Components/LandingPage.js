import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { NavLink } from "react-router-dom";

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
      <h2 style={{ textAlign: "center" }}>Pokemon let's go fighting!</h2>
      <Box sx={{ flexWrap: "wrap" }}>
        <Grid container spacing={1}>
          <Grid container item spacing={3}>
            {categories.map((category) => (
              <Grid item xs={2}>
                <NavLink to={`/${category}`}>
                  <Card>
                    <Box sx={{ width: 300, height: 200 }}>{category}</Box>
                  </Card>
                </NavLink>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
