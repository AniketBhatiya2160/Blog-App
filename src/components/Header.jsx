import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import BackspaceIcon from "@mui/icons-material/Backspace";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    padding: "20px",
    justifyContent: "space-between",
    alignItems: "",
    background: "#f7f7f7",
    color: "#333",
    fontFamily: "Arial, sans-serif",
  },

  button: {
    background: "#007bff",
    color: "#fff",
    fontWeight: "bold",
    "&:hover": {
      background: "#0069d9",
    },
  },
}));

const Header = () => {
  const location = useLocation();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1 style={{ marginLeft: "160px" }}>Blog App  </h1>

      {location.pathname !== "/" && (
        <Link to={"/"}>
          <Button
            variant="outlined"
            className={classes.button}
            startIcon={<BackspaceIcon />}
          >
            Back{" "}
          </Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
