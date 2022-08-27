import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

const Catalog = () => {
  const data = Array.from(Array(16).keys());

  const CardProduct = () => (
    <Card
    // sx={{ maxWidth: "100%" }}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        height="240"
        image={`http://placeimg.com/640/480/animals?${Math.random()}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Elwyn
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      // columns={{ xs: 3, sm: 4, md: 6, lg: 12 }}
    >
      {data.map((_, index) => (
        <Grid item lg={3} md={4} sm={6} xs={12} key={index}>
          <CardProduct />
        </Grid>
      ))}
    </Grid>
  );
};

export default Catalog;
