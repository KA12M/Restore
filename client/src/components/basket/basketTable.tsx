import React from "react";
import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/store.config";
import { currencyFormat } from "../../app/utility/uitl";
import {
  addBasketItemAsync,
  removeBasketItemAsync,
} from "../../app/store/basket.slice";
import { BasketItem } from "../../app/models/Basket";

const BaseUrl = import.meta.env.VITE_API_URL;

interface Props {
  items: BasketItem[];
  isBasket?: boolean;
}

const BasketTable = ({ items, isBasket = true }: Props) => {
  const { status } = useAppSelector((state) => state.basket);

  const dispatch = useAppDispatch();

  const handleRemoveItem = (
    productId: number,
    name: string,
    quantity: number = 1
  ) => dispatch(removeBasketItemAsync({ productId, quantity, name }));

  const handleAddItem = (productId: number, name: string) =>
    dispatch(addBasketItemAsync({ productId }));

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            {isBasket && <TableCell align="right"></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Box display="flex" alignItems="center">
                  <img
                    src={BaseUrl + item.pictureUrl}
                    style={{
                      width: "80px",
                      height: "80px",
                      padding: "5px",
                      objectFit: "cover",
                    }}
                    alt={item.name}
                  />
                  {item.name}
                </Box>
              </TableCell>
              <TableCell align="right">{currencyFormat(item.price)}</TableCell>
              <TableCell align="center">
                {isBasket && (
                  <LoadingButton
                    loading={
                      status === "pendingRemoveItem" + item.productId + "rem"
                    }
                    onClick={() => handleRemoveItem(item.productId, "rem")}
                  >
                    <Remove />
                  </LoadingButton>
                )}
                {item.quantity}
                {isBasket && (
                  <LoadingButton
                    loading={status === "pendingAddItem" + item.productId}
                    onClick={() =>
                      handleAddItem(
                        item.productId,
                        "add" + item.productId.toString()
                      )
                    }
                  >
                    <Add />
                  </LoadingButton>
                )}
              </TableCell>
              <TableCell align="right">
                {currencyFormat(item.quantity * item.price)}
              </TableCell>
              <TableCell align="right">
                {isBasket && (
                  <LoadingButton
                    loading={
                      status === "pendingRemoveItem" + item.productId + "del"
                    }
                    onClick={() =>
                      handleRemoveItem(item.productId, "del", item.quantity)
                    }
                    color="error"
                  >
                    <Delete />
                  </LoadingButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasketTable;

