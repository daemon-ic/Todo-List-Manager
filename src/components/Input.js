import React, { useState, useContext, useEffect } from "react";
import fire from "../Firebase";
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

var listsDB = fire.firestore().collection("Lists");

//--------------------------------------------------------------- MUI STYLING

const useStyles = makeStyles((theme) => ({
  input1: {
    "& > *": {
      margin: theme.spacing(1),
      width: "500px",
    },
  },
}));

//--------------------------------------------------------------- MUI STYLING
//--------------------------------------------------------------- SETUP

const Input = ({ currentGroupContents, currentPage }) => {
  const [keystroke, setKeystroke] = useState("");
  const classes = useStyles();

  //--------------------------------------------------------------- SETUP
  //--------------------------------------------------------------- FUNCTIONS

  const onType = (input) => {
    setKeystroke(input);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const id = uuidv4();
    const timestamp = Date.now();

    if (!currentGroupContents) {
      listsDB.doc("Default List").set({
        "Default List": [
          {
            id,
            keystroke,
            timestamp,
          },
        ],
        timestamp,
      });
    } else {
      listsDB.doc(currentPage).update({
        [currentPage]: [
          ...currentGroupContents,
          {
            id,
            keystroke,
            timestamp,
          },
        ],
      });
    }
    setKeystroke("");
  };

  //--------------------------------------------------------------- FUNCTIONS
  //--------------------------------------------------------------- RENDER

  return (
    <>
      <form className={classes.input1} noValidate autoComplete="off">
        <TextField
          id="filled-basic"
          label="Add Item"
          variant="standard"
          fullWidth
          value={keystroke}
          onChange={(e) => onType(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSubmit(e);
            }
          }}
        />
      </form>
    </>
  );
};

export default Input;
