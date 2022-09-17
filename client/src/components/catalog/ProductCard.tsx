import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { red } from "@mui/material/colors";

import Product from "../../app/models/Product";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StroeContext";

interface Props {
  item: Product;
}

const ProductCard = ({ item }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setBasket } = useStoreContext();

  const haddleAddItem = async (productId: number) => {
    setIsLoading(true);
    agent.Basket.addBasket(productId)
      .then((res) => {
        console.log(res);
        setBasket(res);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };
  return (
    <Grid item lg={4} md={4} sm={6} xs={12}>
      <Card
        sx={{
          maxWidth: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardHeader
          sx={{ textOverflow: "ellipsis" }}
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {item.name.at(0)?.toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <Box component="div" sx={{ textOverflow: "ellipsis" }}>
              {item.name}
            </Box>
          }
          subheader={item.brand + " / " + item.type}
        />
        <CardMedia
          component="img"
          alt="green iguana"
          height="240"
          sx={{ bgcolor: "skyblue", backgroundSize: "contain" }}
          image={import.meta.env.VITE_API_URL + item.pictureUrl}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            $ {item.price.toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
        </CardContent>
        <CardActions sx={{ marginTop: "auto" }}>
          <LoadingButton
            size="small"
            loading={isLoading}
            onClick={() => haddleAddItem(item.id)}
          >
            Add to cart
          </LoadingButton>
          <Button size="small" component={Link} to={"/catalog/" + item.id}>
            View
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductCard;
