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

const Catalog = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {  
    agent.Catalog.list()
      .then((res: any) => setData(res))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent message="Loading Products....." />;

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
