import { Grid } from "@mui/material";
import React from "react";
import ProductCard from "./ProductCard";
import Product from "../../app/models/Product";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useAppSelector } from "../../app/store/store.config";

interface Props {
  products: Product[];
}

const ProductList = ({ products }: Props) => {
  const { productsLoaded } = useAppSelector((state) => state.catalog);

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      // columns={{ xs: 3, sm: 4, md: 6, lg: 12 }}
    >
      {products.map((item: Product, index) => (
        <Grid key={index} item lg={4} md={4} sm={6} xs={12}>
          {!productsLoaded ? (
            <ProductCardSkeleton />
          ) : (
            <ProductCard item={item} />
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
