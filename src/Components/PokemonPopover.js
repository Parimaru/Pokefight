import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { useContext, useState } from "react";
import { PopoverContext } from "../Context/PopoverContext";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, width: 400 }} {...other}>
      {children}
      {onClose ? (
        <Button
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          x
        </Button>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function PokemonCardInfo() {
  const { popover, setPopover } = useContext(PopoverContext);

  const handleClickOpen = () => {
    setPopover(true);
  };
  const handleClose = () => {
    setPopover(false);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={popover}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          MyPokemon
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Card
            sx={{
              backgroundImage:
                "url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png)",
              backgroundSize: "contain",
            }}
          >
            <Box sx={{ width: 300, height: 400 }}></Box>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            CHOOSE THIS POKEMON
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
