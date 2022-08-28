import { Grid } from "@mui/material";
import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "../../app/models/Product";

interface Props {
  products: Product[];
}

const ProductList = ({ products }: Props) => {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      // columns={{ xs: 3, sm: 4, md: 6, lg: 12 }}
    >
      {products.map((item : Product, index) => (
        <ProductCard key={index} item={item} />
      ))}
    </Grid>
  );
};

export default ProductList;
