import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import agent from "../../app/api/agent";
import ProductList from "./ProductList";
import Product from "../../app/models/Product";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/store.config";
import {
  fetchFilters,
  fetchProductsAsync,
  productSelectors,
  setPageNumber,
  setProductParams,
} from "../../app/store/catalog.slice";
import ProductSearch from "./ProductSearach";
import RadioButtonGroup from "../RadioButtonGroup";
import CheckboxButtons from "../CheckBoxButton";
import AppPagination from "../AppPagination";
import useProducts from "../../app/hook/useProduct";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price - High to low" },
  { value: "price", label: "Price - Low to high" },
];

const Catalog = () => {
  const { productParams } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();
  
  const { data, brands, types, filtersLoaded, metaData } = useProducts();

  if (!filtersLoaded) return <LoadingComponent message="Loading Products..." />;

  return (
    <Grid container columnSpacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          Sort Radio
          <RadioButtonGroup
            selectedValue={productParams.orderBy}
            options={sortOptions}
            onChange={(e) =>
              dispatch(setProductParams({ orderBy: e.target.value }))
            }
          />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          Brand
          <CheckboxButtons
            items={brands}
            checked={productParams.brands}
            onChange={(items: string[]) =>
              dispatch(setProductParams({ brands: items }))
            }
          />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          Types
          <CheckboxButtons
            items={types}
            checked={productParams.types}
            onChange={(items: string[]) =>
              dispatch(setProductParams({ types: items }))
            }
          />
        </Paper>
      </Grid>
      <Grid xs={9} item>
        <ProductList products={data} />
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={9} sx={{ mb: 2 }}>
        {metaData && (
          <AppPagination
            metaData={metaData}
            onPageChange={(page: number) =>
              dispatch(setPageNumber({ pageNumber: page }))
            }
          />
        )}
      </Grid>
    </Grid>
  );
};

export default Catalog;
