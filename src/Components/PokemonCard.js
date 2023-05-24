import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

// const bull = (
//   <Box
//     component="span"
//     sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
//   ></Box>
// );

export default function PokemonCard() {
  return (
    <Card
      sx={{
        backgroundImage:
          "url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png)",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box sx={{ width: 300, height: 200 }}></Box>
    </Card>
  );
}
