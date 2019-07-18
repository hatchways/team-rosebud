import React, { useState } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Chip from "@material-ui/core/Chip";
import { Grid } from "@material-ui/core";

export default function AddProject() {
  const [open, setOpen] = useState(true);
  const [skill, setSkill] = useState("");
  const [chipData, setChipData] = React.useState([]);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Icon fontSize="small" onClick={handleClickOpen}>
        settings
      </Icon>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add the field you want to update in your profile and submit the form
          </DialogContentText>

          <TextField
            autoFocus
            fullWidth
            variant="outlined"
            margin="normal"
            id="name"
            label="Name of the project"
            name="name"
          />
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            id="demo"
            label="Demo Link"
            name="demo"
          />
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            id="gitHub"
            label="GitHub Link"
            name="gitHub"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
