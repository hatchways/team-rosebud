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

export default function EditModal() {
  const [open, setOpen] = useState(false);
  const [skill, setSkill] = useState("");
  const [chipData, setChipData] = React.useState([]);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const handleDelete = chipToDelete => () => {
    setChipData(chips => chips.filter(chip => chip.key !== chipToDelete.key));
  };

  const addSkills = () => {
    if (!skill) return;
    chipData.push({ key: chipData.length, label: skill });
    console.log(chipData);
    setSkill("");
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Profile</DialogTitle>
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
            label="Name"
            name="name"
          />

          <Grid container justify="space-between">
            <TextField
              style={{ width: "48%" }}
              variant="outlined"
              margin="normal"
              id="city"
              label="City"
              name="city"
            />

            <TextField
              style={{ width: "48%" }}
              variant="outlined"
              margin="normal"
              id="province"
              label="Provinces"
              name="provinces"
            />
          </Grid>
          {chipData.map(data => {
            return (
              <Chip
                key={data.key}
                label={data.label}
                onDelete={handleDelete(data)}
              />
            );
          })}
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            id="skills"
            label="Skills"
            name="skills"
            value={skill}
            onChange={e => setSkill(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    onClick={addSkills}
                    color="primary"
                  >
                    Add
                  </Button>
                </InputAdornment>
              )
            }}
          />
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            type="number"
            id="yoe"
            label="Years of Experience"
            name="yoe"
          />
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            id="about"
            label="About"
            name="about"
            multiline
            rowsMax="3"
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
