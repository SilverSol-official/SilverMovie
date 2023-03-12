import * as React from "react";
import { FC } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import PopUp from "./popUp";
import { CardProp } from "../types";
import { AppDispatch } from "../rdx/Store/store";
import { useDispatch } from "react-redux";
import { fetchMovie } from "../rdx/Features/id";

type itemInfoProp = {
  item:CardProp,
}


const MovieCard:FC<itemInfoProp> = ({item}) => {
  const { Title, Year, Poster, imdbID } = item;
  const [open, setOpen] = React.useState(false);
  const dispatch:AppDispatch = useDispatch();
  
  return (
    <Card sx={{ maxWidth: 400,maxHeight:702, height: "100%",cursor:'poiner' }}>
      <CardActionArea onClick={()=>{setOpen(true);dispatch(fetchMovie(imdbID))}} >
        <CardMedia
          component="img"
          height="500"
          image={Poster}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {Title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {Year}
          </Typography>
          {open? <PopUp id={imdbID} openI={open}/>:''}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;
