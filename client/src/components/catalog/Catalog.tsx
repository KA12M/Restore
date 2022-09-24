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

import agent from "../../app/api/agent";
import ProductList from "./ProductList";
import Product from "../../app/models/Product";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from '../../app/store/store.config';
import { fetchProductsAsync, productSelectors } from "../../app/store/catalog.slice";

const Catalog = () => {
  const data = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, status } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);
  
  if (status.includes("pending"))
    return <LoadingComponent message="Loading Products..." />;

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
