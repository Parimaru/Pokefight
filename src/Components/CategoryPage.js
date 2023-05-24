import { useParams } from "react-router-dom";
import { Card, Box, Grid } from "@mui/material";
import { NavLink } from "react-router-dom";
import PokemonCardInfo from "./PokemonInfo";

export default function Category() {
  const pokemons = ["Pikatchu", "Ratzfratz", "Pumeluff"];

  const { category } = useParams();
  return (
    <>
      <h3>{category}</h3>
      <Box sx={{ flexWrap: "wrap" }}>
        <Grid container spacing={1}>
          <Grid container item spacing={3}>
            {pokemons.map((pokemon) => (
              <Grid item xs={2}>
                <Card onClick={() => <PokemonCardInfo />}>
                  <Box sx={{ width: 300, height: 200 }}>{pokemon}</Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
