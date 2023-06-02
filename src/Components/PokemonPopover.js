import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import { PopoverContext } from "../Context/PopoverContext";
import "./PokemonPopover.css";
import { DatabaseContext } from "../Context/DatabaseContext";
import { DataContext } from "../Context/DataContext";
import { CatchingPokemonSharp } from "@mui/icons-material";

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
    <DialogTitle sx={{ m: 0, width: 357, padding: "12px" }} {...other}>
      {children}
      {onClose ? (
        <Button
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <div className="button">x</div>
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
  const { popover, setPopover, currentCategory, currentPokemon } =
    useContext(PopoverContext);
  const { hero, setHero, enemy, setEnemy } = useContext(DataContext);

  const { pokes } = useContext(DatabaseContext);
  console.log("My pokemon is coming", pokes);

  const handleClose = () => {
    //check if hero exists, if not setHero(...innerHTML) else setEnemy(...innerHTML)
    //const handleSelectPokemon = () => {}
    //redirect landing page
    setPopover(false);
  };

  const iconLink = "../img/icon/" + currentCategory + ".png";
  const iconType1 = "../img/icon/" + currentPokemon.type1 + ".png";
  const iconType2 = "../img/icon/" + currentPokemon.type2 + ".png";
  const pokecardImage = {
    backgroundImage: "url(../img/" + currentCategory + ".png)",
  };

  return (
    <div className="dialog">
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={popover}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          sx={{
            width: "550px",
            height: "auto",
            margin: "0 auto",
            padding: "0 0 0 3",
          }}
        ></BootstrapDialogTitle>
        <DialogContent
          dividers
          sx={{
            width: "94%",
            height: "auto",
            margin: "0 auto",
            p: 0,
          }}
        >
          <div>
            <div className="pokeCard" style={pokecardImage}>
              <div className="container">
                <div className="header">
                  <p className="name">{currentPokemon.name}</p>
                  <div className="headerRight">
                    <p className="hp">HP</p>
                    <p className="hpValue">100</p>
                    <img src={iconType1} className="typeIcon icon" />
                    {currentPokemon.type2.length > 0 && (
                      <img src={iconType2} className="typeIcon icon" />
                    )}
                  </div>
                </div>
                <p className="basicEvolve">
                  Evolves from {currentPokemon.evolvesFrom}
                </p>
                <img
                  className="picturePokemon"
                  src={currentPokemon.pictureArt}
                />
                <p className="description">
                  NO. {currentPokemon.id} {currentPokemon.type1}{" "}
                  {currentPokemon.type2} Height: {currentPokemon.height} Weight:{" "}
                  {currentPokemon.weight}
                </p>
                <p className="textTop">{currentPokemon.text1}</p>
                <div className="attacksField">
                  <div className="icons">
                    <p className="firstIcon">
                      <img className=" icon" src="../img/icon/Normal.png"></img>
                    </p>

                    <div className="secondIcon">
                      <p className="twoTimes">
                        <img className="icon" src="../img/icon/Normal.png" />
                        <img src={iconLink} className="typeIcon icon" />
                        x2
                      </p>
                    </div>
                  </div>
                  <div className="attacks">
                    <p className="attack">{currentPokemon.attack1}</p>
                    <p className="">{currentPokemon.attack2}</p>
                  </div>
                  <div className="value">
                    <p>82</p>
                    <p>100</p>
                  </div>
                </div>
                <div className="defence">
                  <p className="defenceValue">83</p>
                  <p className="defenceIcon">
                    <img src={iconLink} className="typeIcon iconSmall" />
                  </p>
                  <p className="oneTime">x1</p>
                  <p className="defenceSpValue">100</p>
                </div>
                <div className="footer">
                  <p className="textButtom">{currentPokemon.text3}</p>
                  <div className="footerRight">
                    <div>Habitat: {currentPokemon.habitat}</div>
                    <div>Base happiness: {currentPokemon.happiness}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              margin: "0 auto",
              display: "flex",
              color: "black",
              width: "100%",
            }}
          >
            I CHOOSE THIS POKÉMON
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
