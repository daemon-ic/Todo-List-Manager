import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import fire from "../Firebase";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

var listsDB = fire.firestore().collection("Lists");

//--------------------------------------------------------------- MUI STYLING

const useStyles = makeStyles((theme) => ({
  chip: {
    marginBottom: "10px",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

//--------------------------------------------------------------- MUI STYLING
//--------------------------------------------------------------- SETUP

const ListDisplay = ({ currentGroupContents, currentPage }) => {
  const classes = useStyles();

  //--------------------------------------------------------------- SETUP
  //--------------------------------------------------------------- FUNCTIONS

  const deleteItem = (obj, itemId) => {
    const newArray = obj.filter((item) => item.id !== itemId);

    listsDB.doc(currentPage).update({ [currentPage]: [...newArray] });
  };

  //--------------------------------------------------------------- FUNCTIONS
  //--------------------------------------------------------------- RENDER

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",

          flexWrap: "wrap",
          height: "fit-content",
          width: "600px",
          overflow: "scroll",
        }}
      >
        {currentGroupContents &&
          currentGroupContents.map((item) => (
            <div key={uuidv4()}>
              <Chip
                style={{ margin: "5px" }}
                className={classes.chip}
                label={item.keystroke}
                color="primary"
                onDelete={() => deleteItem(currentGroupContents, item.id)}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default ListDisplay;
