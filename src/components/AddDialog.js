import React, { useState, useContext } from "react";
import fire from "../Firebase";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";

var listsDB = fire.firestore().collection("Lists");

export default function FormDialog({ pages, onPageCreation }) {
  const [keystroke, setKeystroke] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onType = (input) => {
    setKeystroke(input);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const timestamp = Date.now();

    listsDB.doc(keystroke).set({
      timestamp,
      [keystroke]: [],
    });
    setKeystroke("");
    onPageCreation();
    handleClose();
  };

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen} disableElevation>
        <AddIcon color="primary" />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="email"
            fullWidth
            value={keystroke}
            onChange={(e) => onType(e.currentTarget.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={(e) => onSubmit(e)} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
