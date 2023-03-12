import * as React from "react";
import { FC } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import PopUp from "./popUp";
import { CardProp } from "@/types";

type itemInfoProp = {
  item:CardProp,
}


const MovieCard:FC<itemInfoProp> = ({item}) => {
  const { Title, Year, Poster, imdbID } = item;

  return (
    <Card sx={{ maxWidth: 400, height: "100%" }}>
      <CardActionArea>
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
          <PopUp id={imdbID} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;
