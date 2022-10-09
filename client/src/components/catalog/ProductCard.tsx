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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { red } from "@mui/material/colors";

import Product from "../../app/models/Product";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/store.config";
import { addBasketItemAsync } from "../../app/store/basket.slice";

interface Props {
  item: Product;
}

const ProductCard = ({ item }: Props) => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.basket);

  const haddleAddItem = async (productId: number) => {
    dispatch(addBasketItemAsync({ productId }));
  };

  const mapImg = (img: string) =>
    img.split("/")[1] === "images" ? import.meta.env.VITE_API_URL + img : img;
  
  return (
    <>
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
          loading="lazy"
          alt="green iguana"
          height="240"
          sx={{ bgcolor: "skyblue", backgroundSize: "contain" }}
          image={mapImg(item.pictureUrl)}
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
            loading={status === "pendingAddItem" + item.id}
            onClick={() => haddleAddItem(item.id)}
          >
            Add to cart
          </LoadingButton>
          <Button size="small" component={Link} to={"/catalog/" + item.id}>
            View
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default ProductCard;
