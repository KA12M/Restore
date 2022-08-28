import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import ProductList from "./ProductList";
import Product from "../../app/models/Product";

const Catalog = () => {
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    console.log('gggg');
    
    fetch(import.meta.env.VITE_API_URL + "/apiproducts")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      mb={10}
      // columns={{ xs: 3, sm: 4, md: 6, lg: 12 }}
    >
      <ProductList products={data} />
    </Grid>
  );
};

export default Catalog;
