import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useContext, useParams } from "react";
import { PopoverContext } from "../Context/PopoverContext";
import "./PokemonPopover.css";
import { DatabaseContext } from "../Context/DatabaseContext";
import { DataContext } from "../Context/DataContext";
import { useNavigate } from "react-router-dom";
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
  const {
    popover,
    setPopover,
    currentPokemon,
    currentCategory,
    setCurrentPokemonName,
    currentPoke,
  } = useContext(PopoverContext);
  const {
    hero,
    setHero,
    setHeroAttributes,
    setEnemyAttributes,
    setEnemy,
    pokemonTypeObject,
  } = useContext(DataContext);
  const { pokes } = useContext(DatabaseContext);
  //console.log("My pokemon is coming", pokes);

  const navigate = useNavigate();

  const handleClose = () => {
    setPopover(false);
    setCurrentPokemonName(null);
  };

  const handleSelectPokemon = () => {
    if (!hero) {
      setHero(currentPoke);
      setHeroAttributes(currentPokemon);
      navigate("/");
      setPopover(false);
    } else {
      setEnemy(currentPoke);
      setEnemyAttributes(currentPokemon);
      navigate("/fight");
      setPopover(false);
    }
  };

  const iconLink = "../img/icon/" + currentCategory + ".png";
  const iconType1 = "../img/icon/" + currentPoke?.type1 + ".png";
  const iconType2 = "../img/icon/" + currentPoke?.type2 + ".png";
  const pokecardImage = {
    backgroundImage: "url(../img/pokePopup/" + currentCategory + ".png)",
  };

  console.log(currentPokemon, currentPoke);

  return (
    <div className="dialog">
      <BootstrapDialog
        onClose={handleClose}
        aria-labelled
        by="customized-dialog-title"
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
          {currentPokemon && (
            <div>
              <div className="pokeCard" style={pokecardImage}>
                <div className="containerPopover">
                  <div className="header">
                    <p className="name">{currentPoke.name}</p>
                    <div className="headerRight">
                      <p className="hp">HP</p>
                      <p className="hpValue">{currentPokemon.base.HP}</p>
                      <img src={iconType1} className="space icon" />
                      {currentPoke?.type2.length > 0 && (
                        <img src={iconType2} className="space icon" />
                      )}
                    </div>
                  </div>
                  <p className="basicEvolve">
                    {currentPoke.evolvesFrom == "" ? (
                      "Basic"
                    ) : (
                      <>
                        Evolves from{" "}
                        <span className="evolveName">
                          {currentPoke.evolvesFrom}
                        </span>
                      </>
                    )}
                  </p>
                  <img
                    className="picturePokemon"
                    src={currentPoke.pictureArt}
                  />
                  <div className="description">
                    <span>NO.</span>
                    <span>{currentPoke.id}</span>
                    <span></span>
                    <div className="typeOne">{currentPoke.type1}</div>
                    <span className="typeTwo">{currentPoke.type2}</span>
                    <span></span>
                    <span>Height:</span>
                    <span>{currentPoke.height}</span>
                    <span></span>
                    <span>Weight:</span>
                    <span>{currentPoke.weight}</span>
                  </div>
                  <p className="textTop">
                    {currentPoke.text1
                      .replace("\n", " ")
                      .replace("\f", " ")
                      .replace("POKéMON", "Pokémon")}
                  </p>
                  <div className="attacksField">
                    <div className="icons">
                      <p className="firstIcon">
                        <img
                          className=" icon"
                          src="../img/icon/Normal.png"
                        ></img>
                      </p>

                      <div className="secondIcon">
                        <p className="twoTimes">
                          <img className="icon" src="../img/icon/Normal.png" />
                          <img src={iconLink} className="space icon" />
                          <span className="space">x2</span>
                        </p>
                      </div>
                    </div>
                    <div className="attacks">
                      <p className="attack">{currentPoke.attack1}</p>
                      <p className="attack">{currentPoke.attack2}</p>
                    </div>
                    <div className="value">
                      <p>{currentPokemon.base.Attack}</p>
                      <p>{currentPokemon.base["Sp. Attack"]}</p>
                    </div>
                  </div>
                  <div className="defence">
                    <p className="defenceLable">| Defence</p>
                    <p className="defenceValue">
                      {currentPokemon.base.Defense}
                    </p>
                    <p className="lineOne">|</p>
                    <p className="defenceIcon">
                      <img src={iconLink} className="typeIcon iconSmall" />
                    </p>
                    <p className="oneTime">x1</p>
                    <p className="defenceSp">Sp. Defence</p>
                    <p className="defenceSpValue">
                      {currentPokemon.base["Sp. Defense"]}
                    </p>
                    <p className="lineTwo">|</p>
                  </div>
                  <div className="footer">
                    <p className="textButtom">
                      {currentPoke.text2
                        .replace("\n", " ")
                        .replace("\f", " ")
                        .replace("POKéMON", "Pokémon")}
                    </p>
                    <div className="footerRight">
                      <div className="flex">
                        <div>Habitat: </div>
                        <div className="habitat">{currentPoke.habitat}</div>
                      </div>
                      <div>Base happiness: {currentPoke.happiness}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          {hero ? (
            <Button
              onClick={handleSelectPokemon}
              sx={{
                margin: "0 auto",
                display: "flex",
                color: "black",
                width: "100%",
              }}
            >
              I CHOOSE THIS ENEMY
            </Button>
          ) : (
            <Button
              onClick={handleSelectPokemon}
              sx={{
                margin: "0 auto",
                display: "flex",
                color: "black",
                width: "100%",
              }}
            >
              I CHOOSE THIS POKÉMON
            </Button>
          )}
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
