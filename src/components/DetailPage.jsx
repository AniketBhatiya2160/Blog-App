import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePost } from "../store/user/userSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    padding: "20px",
    justifyContent: "center",
    alignItems: "center",
    background: "#f7f7f7",
    color: "#333",
    fontFamily: "Arial, sans-serif",
    minHeight: "90vh",
  },
  card: {
    background: "rgb(175, 216, 255)",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    borderRadius: "27px",
    padding: "16px",
    margin: "auto",
    width: "30vw",
    height: "33vh",
    lineHeight: " 7vh",
  },
  button: {
    background: "#007bff",
    color: "#fff",
    fontWeight: "bold",
    "&:hover": {
      background: "#0069d9",
    },
  },
  dialogTitle: {
    background: "#007bff",
    color: "#fff",
    fontWeight: "bold",
  },
  dialogContent: {
    background: "#f2f2f2",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
  },
  dialogText: {
    fontSize: "18px",
    marginBottom: "15px",
    color: "#333",
  },
}));

export default function DetailPage() {
  const { id = null } = useParams();
  const [selectedPost, setSelectedPost] = useState(null);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.author.data);
  const author = posts?.user;
  const classes = useStyles();

  useEffect(() => {
    if (id) {
      dispatch(getSinglePost(id));
    }
  }, [dispatch, id]);

  const handlePostClick = () => {
    setSelectedPost(author);
  };

  const handleCloseDialog = () => {
    setSelectedPost(null);
  };

  return (
    
    <Grid container  className={classes.root}>
      <div>
      <Grid item xs={12}>
        <Card variant="outlined" className={classes.card}>
          <CardContent>
            <Typography variant="h4">{posts?.title}</Typography>
            <Typography variant="body1">{posts?.body}</Typography>
          </CardContent>
        </Card>
        <Button style={{ "marginLeft": "160px", marginTop: "20px",color:"red"}}
              onClick={handlePostClick}
              variant="text"
              className={classes.button}
            >  Author Details  </Button>
      </Grid>
      </div>
      <Dialog
        open={Boolean(selectedPost)}
        className={classes.dialogueContainer}
        onClose={handleCloseDialog}
      >
        <DialogTitle className={classes.dialogTitle}>
          {author?.firstName}
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Typography>First Name: {author?.firstName}</Typography>
          <Typography>Last Name: {author?.lastName}</Typography>
          <Typography>User Name: {author?.username}</Typography>
          <Typography>Address: {author?.address?.address}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}