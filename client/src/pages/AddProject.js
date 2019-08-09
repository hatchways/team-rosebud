import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles(theme => ({
  button: {
    marginLeft: theme.spacing(3)
  }
}));

function AddProject(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState();
  const [projectName, setProjectName] = useState();
  const [githubLink, setGithubLink] = useState("");
  const [demoLink, setDemoLink] = useState("");
  const [file, setFile] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setErrorMessage();
    setImage();
    setProjectName();
    setGithubLink();
    setDemoLink();
    setFile();
  }

  function handleSubmit() {
    setErrorMessage("");
    fetch("/api/user/" + localStorage.getItem("user_id") + "/project", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      },
      body: JSON.stringify({
        name: projectName,
        githubLink: githubLink,
        user_id: localStorage.getItem("user_id"),
        demoLink: demoLink
      })
    })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          setErrorMessage("Opps! Something went wrong. Please try again.");
        }
      })
      .then(res => {
        if (res) {
          if (file) {
            let form = new FormData();
            form.append("image", file[0]);

            fetch("/api/upload_image/" + res.id, {
              method: "POST",
              body: form
            }).then(res => props.onChange());
          }
          handleClose();
        }
        props.onChange();
      });
  }

  function openImage(e) {
    setImage(URL.createObjectURL(e[0]));
    setFile(e);
  }

  return (
    <div>
      <Button
        className={classes.button}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Add New Project
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Project</DialogTitle>

        <DialogContent>
          <div style={{ color: "red" }}>{errorMessage}</div>
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
            onChange={e => setProjectName(e.target.value)}
          />
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            id="demo"
            label="Demo Link"
            name="demo"
            onChange={e => setDemoLink(e.target.value)}
          />
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            id="gitHub"
            label="GitHub Link"
            name="gitHub"
            onChange={e => setGithubLink(e.target.value)}
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
            onChange={e => openImage(e.target.files)}
          />
          <label htmlFor="raised-button-file">
            <Button variant="contained" component="span">
              Add image
            </Button>
          </label>
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
export default withRouter(AddProject);
