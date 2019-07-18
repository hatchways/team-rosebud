import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AddProject() {
  const [open, setOpen] = useState(true);
  const [image, setImage] = useState("");

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function openImage(e) {
    setImage(URL.createObjectURL(e));
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
          <div>
            <img src={image} alt="" style={{ maxWidth: "150px" }} />
          </div>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="raised-button-file"
            multiple
            type="file"
            onChange={e => openImage(e.target.files[0])}
          />
          <label htmlFor="raised-button-file">
            <Button variant="raised" component="span">
              Add image
            </Button>
          </label>
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
