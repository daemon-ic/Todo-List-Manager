import React, { useState, useContext } from "react";
import fire from "../Firebase";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import RemoveIcon from "@material-ui/icons/Remove";

export default function FormDialog({ onPageDeletion }) {
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
    handleClose();
    onPageDeletion();
  };

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen} disableElevation>
        <RemoveIcon color="primary" />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Delete Category</DialogTitle>
        <DialogContent>
          Are you sure you want to permanently delete this category and
          contents?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={(e) => onSubmit(e)} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
