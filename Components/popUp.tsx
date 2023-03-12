import * as React from "react";
import { FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CardMedia from "@mui/material/CardMedia";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovie } from '../rdx/Features/id';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { AppDispatch, RootState } from "../rdx/Store/store";
import { PopUpId } from "../types";

const style1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type PopUpPropsType = {
  id: PopUpId,
}

const PopUp:FC<PopUpPropsType> = ({ id }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch:AppDispatch = useDispatch();
  const { idStatus, idError }= useSelector((state):RootState => state.id);
  const movieResult = useSelector((state):RootState => state.id.idResult);
  console.log(movieResult);

  const statusCheck = () => {
    if (idStatus === "loading" && idError === null) {
      return (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style1}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Loading...
            </Typography>
          </Box>
        </Modal>
      );
    } else if (idError != null) {
      return (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style1}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              An error occured: {idError}
            </Typography>
          </Box>
        </Modal>
      );
    } else {
      return (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style1}>
            <input
              type="button"
              onClick={() => {
                handleClose();
              }}
              value="X"
              className="btn"
              style={{ float: "right" }}
            />

            <Typography id="modal-modal-title" variant="h6" component="h2">
              {movieResult.Title}
            </Typography>
            <Box
              className="wrapper"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <div className="info" >
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary={`Released: ${movieResult.Released}`}
                      ></ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`Genre: ${movieResult.Genre}`}
                      ></ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`Actors: ${movieResult.Actors}`}
                      ></ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`Box office: ${movieResult.BoxOffice}`}
                      ></ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`Plot: ${movieResult.Plot}`}
                      ></ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`IMDB rating: ${movieResult.imdbRating}`}
                      ></ListItemText>
                    </ListItem>
                  </List>
                </Typography>
              </div>
              <div className="img">
                <CardMedia
                  component="img"
                  sx={{ mt: 5, width: "195%" }}
                  image={movieResult.Poster}
                  alt="green iguana"
                />
              </div>
            </Box>
          </Box>
        </Modal>
      );
    }
  };

  return (
    <div>
      {statusCheck()}
      <input
        type="button"
        onClick={() => {
          handleOpen();
          dispatch(fetchMovie(id));
        }}
        value="More info"
        className="btn btn-dark mt-2"
      />
    </div>
  );
};

export default PopUp;
