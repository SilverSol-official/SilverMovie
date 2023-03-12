import * as React from "react";
import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { fetchSearch } from "../rdx/Features/movie";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Header = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const inputHandler = (event) => {
    setSearch(event.target.value);
  };
  return (
    <header>
    <Box sx={{ flexGrow: 1, width: "86%", margin: "auto", marginTop: "10px" }}>
      <AppBar position="static" color="default">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <LocalMoviesIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            SilverMovie
          </Typography>
          {/* <Button variant="primary" sx={{ marginLeft: "10px" }}>
            <DarkModeIcon variant="primary" />
          </Button> */}
          {/* search */}
          <Search
            sx={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}
          >
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={search}
              onChange={(event) => {
                inputHandler(event);
              }}
            />
          </Search>

          <Button
            variant="primary"
            sx={{ marginLeft: "10px" }}
            onClick={() => dispatch(fetchSearch(search))}
          >
            <SearchIcon />
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
    </header>
  );
};

export default Header;
