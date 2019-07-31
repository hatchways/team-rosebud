import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Chip from "@material-ui/core/Chip";

function EditModal(props) {
  const [open, setOpen] = useState(false);
  const [skill, setSkill] = useState("");
  const [chipData, setChipData] = useState([]);
  const [location, setLocation] = useState("");
  const [yearsexp, setYearsexp] = useState("");
  const [description, setDescription] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      fetch("/api/user/" + localStorage.getItem("user_id"), {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          setUsername(res.username);
          if (res.location === null) setOpen(true);
        });
    };

    fetchData();
  }, []);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleSubmit() {
    fetch("/api/user/" + localStorage.getItem("user_id"), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      },
      body: JSON.stringify({
        username: username,
        location: location,
        yearsexp: yearsexp,
        description: description
      })
    }).then(res => {
      console.log(res);
      console.log(res.status);
      if (res.status === 200) {
        //TODO check for successfull update in db
        //props.history.push("/profile");
        const parent = {
          location: location,
          yearsexp: yearsexp,
          description: description
        };
        props.onChange(parent);
      }
      //return res.json();
    });

    if (chipData.length !== 0) {
      chipData.map(chip =>
        fetch("/api/user/" + localStorage.getItem("user_id") + "/skill", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access_token")
          },
          body: JSON.stringify({
            name: chip.label
          })
        })
      );
    }
    setOpen(false);
  }

  const handleDelete = chipToDelete => () => {
    setChipData(chips => chips.filter(chip => chip.key !== chipToDelete.key));
  };

  const addSkills = e => {
    if (!e) return;
    chipData.push({ key: chipData.length, label: e });
    setSkill("");
  };

  const divStyle = {
    marginBottom: '10px',
  };


  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen} style= {divStyle}>
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
            fullWidth
            variant="outlined"
            margin="normal"
            id="location"
            label="Location"
            name="location"
            onChange={e => setLocation(e.target.value)}
          />

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
            onKeyPress={e => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkills(e.target.value);
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    onClick={e => addSkills(skill)}
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
            onChange={e => setYearsexp(e.target.value)}
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
            onChange={e => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default withRouter(EditModal);
