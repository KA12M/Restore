import { Box, Paper, Typography, Grid, Button } from "@mui/material";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import useProducts from "../../app/hook/useProduct";
import Product from "../../app/models/Product";
import { AppDropzone } from "../AppDropzone";
import AppSelectList from "../AppSelectList";
import AppTextInput from "../AppTextInput";

import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./productValidation";
import { useAppDispatch } from "../../app/store/store.config";
import agent from "../../app/api/agent";
import { setProduct } from "../../app/store/catalog.slice";
import { LoadingButton } from '@mui/lab';

interface Props {
  product?: Product; //กรณีเป็น ? หมายถึง สามารถก าหนดค่าเป็น undefined
  cancelEdit: () => void;
}

export default function ProductForm({ product, cancelEdit }: Props) {
  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { isDirty, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { brands, types } = useProducts();
  const dispatch = useAppDispatch();

  const watchFile = watch("file", null);

  useEffect(() => {
    if (product && !watchFile && !isDirty) reset(product);

    return () => {
      if (watchFile) URL.revokeObjectURL(watchFile.preview); //ลบ URL ของภาพ
    };
  }, [product, reset, watchFile, isDirty]);

  async function handleSubmitData(data: FieldValues) {
    try {
      let response: Product;
      if (product) response = await agent.Admins.updateProduct(data);
      else response = await agent.Admins.createProduct(data);

      dispatch(setProduct(response));
      cancelEdit();
    } catch (error) {
      console.log(error);
    }
  }

  const mapImg = (img: string) =>
    img.split("/")[1] === "images" ? import.meta.env.VITE_API_URL + img : img;

  return (
    <Box component={Paper} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Product Details
      </Typography>
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <AppTextInput control={control} name="name" label="Product name" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppSelectList
              control={control}
              items={brands}
              name="brand"
              label="Brand"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppSelectList
              control={control}
              items={types}
              name="type"
              label="Type"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              type="number"
              control={control}
              name="price"
              label="Price"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              type="number"
              control={control}
              name="quantityInStock"
              label="Quantity in Stock"
            />
          </Grid>
          <Grid item xs={12}>
            <AppTextInput
              multiline={true}
              rows={4}
              control={control}
              name="description"
              label="Description"
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <AppDropzone control={control} name="file" />
              {watchFile ? (
                <img
                  src={watchFile.preview}
                  alt="preview"
                  style={{ maxHeight: 200 }}
                />
              ) : (
                <img
                  src={product?.pictureUrl && mapImg(product!.pictureUrl)}
                  alt={product?.name}
                  style={{ maxHeight: 200 }}
                />
              )}
            </Box>
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
          <Button variant="contained" color="inherit" onClick={cancelEdit}>
            Cancel
          </Button>
          <LoadingButton
            loading={isSubmitting}
            variant="contained"
            color="success"
            type="submit"
          >
            Submit
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
}
